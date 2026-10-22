'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motionConfig, narrative } from '@/lib/narrative';

/*
 * Hero backdrop: graded portrait + a WebGL point cloud built from it (same technique as the reference).
 * Every bright pixel becomes a soft point in its own colour. The cloud yaws a hair towards the pointer,
 * shimmers at the edges, and streams into a warm horizontal band as the hero scrolls away.
 */

const VERT = `
attribute vec3 aPos;
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime, uProgress, uRot, uBoxH, uDpr, uD;
uniform vec2 uRes, uCenter;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float p = smoothstep(.02, .8, uProgress);
  vec3 target = vec3((aSeed - .5) * 2.5, sin(aSeed * 25.1327) * .055 + (floor(aPos.x * 4. + 2.) - 2.) * .18, sin(aSeed * 18.) * .1);
  vec3 pos = mix(aPos, target, p);
  float edge = smoothstep(.18, .5, abs(aPos.x));
  pos.x += sin(uTime * .3 + aSeed * 40.) * .008 * (edge + p);
  pos.z += sin(aSeed * 64. + uTime * .2) * .015;
  float c = cos(uRot), s = sin(uRot);
  pos = vec3(pos.x * c + pos.z * s, pos.y, -pos.x * s + pos.z * c);
  vec3 px = pos * uBoxH;
  vec2 screen = uCenter + vec2(px.x, -px.y) * (uD / (uD - px.z));
  vec2 clip = screen / uRes * 2. - 1.;
  gl_Position = vec4(clip.x, -clip.y, 0., 1.);
  gl_PointSize = (1.08 + dot(aColor, vec3(.299, .587, .114)) * .8) * uDpr;
  vColor = mix(aColor, vec3(1., .44, .18), p * .55);
  vAlpha = (1. - p * .35) * smoothstep(.5, .36, abs(aPos.y));
}`;

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - .5);
  // softer, lighter grain than the reference so the face underneath stays readable
  float a = smoothstep(.5, .22, d) * vAlpha * .7;
  if (a < .025) discard;
  gl_FragColor = vec4(min(vColor * 1.25, 1.), a);
}`;

const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader');
  return sh;
}

export default function HeroCanvas({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // live effects run on every screen; the motion toggle or reduced motion turns them off
  const [auto, setAuto] = useState(false);
  const [motion, setMotion] = useState(true);
  const [failed, setFailed] = useState(false);
  const live = auto && motion && !failed;

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAuto(!reduce.matches);
    sync();
    reduce.addEventListener('change', sync);
    setMotion(document.documentElement.dataset.motion !== 'off');
    const onMotion = (e: Event) => setMotion((e as CustomEvent<boolean>).detail);
    addEventListener('motionchange', onMotion);
    return () => {
      reduce.removeEventListener('change', sync);
      removeEventListener('motionchange', onMotion);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const canvas = canvasRef.current!;
    const box = boxRef.current!;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return setFailed(true);

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
    } catch {
      return setFailed(true);
    }
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      time: U('uTime'), progress: U('uProgress'), rot: U('uRot'), boxH: U('uBoxH'), dpr: U('uDpr'),
      d: U('uD'), res: U('uRes'), center: U('uCenter'),
    };
    const buffers: WebGLBuffer[] = [];
    const attr = (name: string, data: Float32Array, size: number) => {
      const b = gl.createBuffer()!;
      buffers.push(b);
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };

    let count = 0;
    let raf = 0, last = 0, visible = true, disposed = false;
    const state = { progress: 0, rot: 0 };
    let W = 0, H = 0, dpr = 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(devicePixelRatio || 1, motionConfig.maxDpr);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // sample the portrait into points (luminance gate like the reference)
    const img = new window.Image();
    img.onload = () => {
      if (disposed) return;
      const n = innerWidth < 700 ? 180 : 300;
      const m = Math.round(n * 1.25);
      const c = document.createElement('canvas');
      c.width = n;
      c.height = m;
      const ctx = c.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, n, m);
      const { data } = ctx.getImageData(0, 0, n, m);
      const pos: number[] = [], col: number[] = [], seed: number[] = [];
      for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
          const i = (y * n + x) * 4;
          const l = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          if (l < 0.035) continue;
          pos.push((x / n - 0.5) * 0.8, 0.5 - y / m, 0.025 * l);
          col.push(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
          seed.push(((127 * x + 311 * y) % 997) / 997);
        }
      }
      attr('aPos', new Float32Array(pos), 3);
      attr('aColor', new Float32Array(col), 3);
      attr('aSeed', new Float32Array(seed), 1);
      count = seed.length;
      resize();
      box.dataset.live = 'true';
      kick();
    };
    img.onerror = () => setFailed(true);
    img.src = src;

    const frame = (t: number) => {
      raf = 0;
      if (!visible || disposed || !count) return;
      const dt = last ? Math.min(0.1, (t - last) / 1000) : 0.016;
      last = t;
      state.progress = damp(state.progress, narrative.hero, 3, dt);
      state.rot = damp(state.rot, 0.015 * narrative.pointerX, 3, dt);

      const cr = canvas.getBoundingClientRect();
      const br = box.getBoundingClientRect();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, t / 1000);
      gl.uniform1f(u.progress, state.progress);
      gl.uniform1f(u.rot, state.rot);
      gl.uniform1f(u.boxH, br.height);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.d, H / (2 * Math.tan((21 * Math.PI) / 180)));
      gl.uniform2f(u.res, W, H);
      gl.uniform2f(u.center, br.left - cr.left + br.width / 2, br.top - cr.top + br.height / 2);
      gl.drawArrays(gl.POINTS, 0, count);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting && !document.hidden;
      if (visible) kick();
    });
    const hero = document.querySelector('.hero');
    if (hero) io.observe(hero);
    const onVis = () => {
      visible = !document.hidden;
      if (visible) kick();
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVis);
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(prog);
      delete box.dataset.live;
    };
  }, [live, src]);

  return (
    <div className="scene-backdrop" aria-hidden="true">
      <div ref={boxRef} className="signal-portrait">
        <Image src={src} alt={alt} width={1000} height={1250} priority sizes="(max-width: 700px) 110vw, 720px" />
      </div>
      {live && <canvas ref={canvasRef} className="signal-canvas" />}
    </div>
  );
}
