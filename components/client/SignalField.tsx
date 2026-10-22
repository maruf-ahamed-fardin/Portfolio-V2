'use client';

import { useEffect, useRef } from 'react';
import SignalText from './SignalText';
import { cn } from '@/lib/utils';

export type Shape = 'structure' | 'ripples' | 'constellation';
const SHAPES: Shape[] = ['structure', 'ripples', 'constellation'];

/* Same shaders as the reference's "signal explorer": 2400 points morph between a waving grid,
   ripple rings and a fibonacci sphere; the pointer sends a ripple through the cloud. */
const VERT = `
attribute vec3 position;
attribute vec3 aTeach;
attribute vec3 aConnect;
uniform vec3 uWeights;
uniform float uTime, uPulse, uRot, uCamZ;
uniform vec2 uPointer;
uniform mat4 uProj;
varying float vGlow;
void main(){
  vec3 p = position * uWeights.x + aTeach * uWeights.y + aConnect * uWeights.z;
  float d = distance(p.xy, uPointer);
  float wave = sin(length(p.xy) * 9. - uTime * 2.5);
  p.z += wave * (.06 + .2 * uWeights.y);
  p.xy += normalize(p.xy + vec2(.001)) * sin(d * 7. - uTime * 4.) * exp(-d * 1.5) * .16;
  p *= 1. + uPulse * .08;
  vGlow = .45 + .4 * exp(-d * 2.) + .15 * wave;
  float c = cos(uRot), s = sin(uRot);
  vec3 mv = vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c - uCamZ);
  gl_Position = uProj * vec4(mv, 1.);
  gl_PointSize = clamp(13. / -mv.z, 1., 4.);
}`;
const FRAG = `
precision mediump float;
varying float vGlow;
void main(){
  float d = length(gl_PointCoord - .5);
  if (d > .5) discard;
  vec3 col = mix(vec3(.68, .65, .59), vec3(1., .48, .22), smoothstep(.45, .9, vGlow));
  gl_FragColor = vec4(col, (1. - smoothstep(.1, .5, d)) * .85);
}`;

function buildGeometry() {
  const a = new Float32Array(7200), b = new Float32Array(7200), c = new Float32Array(7200);
  for (let e = 0; e < 2400; e++) {
    const t = (e % 60) / 59, r = Math.floor(e / 60) / 39;
    a.set([(t - 0.5) * 3, (r - 0.5) * 2.8, 0.12 * Math.sin(18 * t)], 3 * e);
    const n = t * Math.PI * 2, i = 0.2 + 1.5 * r;
    b.set([Math.cos(n) * i, Math.sin(n) * i, 0.2 * Math.sin(8 * i)], 3 * e);
    const y = 1 - (2 * e) / 2399, th = 2.399963 * e, o = Math.sqrt(1 - y * y);
    c.set([Math.cos(th) * o * 1.6, 1.6 * y, Math.sin(th) * o * 1.6], 3 * e);
  }
  return { a, b, c };
}

function perspective(fovDeg: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
  const nf = 1 / (near - far);
  // column-major
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

export default function SignalField({ index, variant, className }: { index: number; variant: 'about' | 'impact'; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef(index);
  const pulse = useRef(0);

  useEffect(() => {
    if (target.current !== index) pulse.current = 1;
    target.current = index;
  }, [index]);

  useEffect(() => {
    const el = host.current!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 700px)');
    let teardown: (() => void) | null = null;
    let visible = false;
    let failed = false;

    const start = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
      if (!gl) return void (failed = true);
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('shader');
        return s;
      };
      let prog: WebGLProgram;
      try {
        prog = gl.createProgram()!;
        gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
      } catch {
        failed = true;
        return;
      }
      gl.useProgram(prog);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // additive, like THREE.AdditiveBlending
      const geo = buildGeometry();
      const bufs = (['position', 'aTeach', 'aConnect'] as const).map((name, i) => {
        const b = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, [geo.a, geo.b, geo.c][i], gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, name);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
        return b;
      });
      const U = (n: string) => gl.getUniformLocation(prog, n);
      const u = { w: U('uWeights'), t: U('uTime'), pulse: U('uPulse'), rot: U('uRot'), cam: U('uCamZ'), ptr: U('uPointer'), proj: U('uProj') };
      // camera closer than the reference so the cloud fills more of its box
      gl.uniform1f(u.cam, variant === 'impact' ? 4.5 : 4.4);

      const weights = [0, 0, 0];
      weights[target.current] = 1;
      const ptr = [4, 4];
      let pulseV = 0, raf = 0, last = 0;

      const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.25);
        canvas.width = Math.round(el.clientWidth * dpr);
        canvas.height = Math.round(el.clientHeight * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniformMatrix4fv(u.proj, false, perspective(40, el.clientWidth / Math.max(1, el.clientHeight), 0.1, 50));
      };
      const frame = (t: number) => {
        raf = 0;
        if (!visible || document.hidden) return;
        if (t - last > 32) {
          for (let i = 0; i < 3; i++) weights[i] += ((i === target.current ? 1 : 0) - weights[i]) * 0.065;
          pulseV += (pulse.current - pulseV) * 0.13;
          pulse.current *= 0.93;
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform3f(u.w, weights[0], weights[1], weights[2]);
          gl.uniform1f(u.t, t * 0.001);
          gl.uniform1f(u.pulse, pulseV);
          gl.uniform1f(u.rot, 0.18 * Math.sin(t * 0.00015));
          gl.uniform2f(u.ptr, ptr[0], ptr[1]);
          gl.drawArrays(gl.POINTS, 0, 2400);
          last = t;
        }
        raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
      };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ptr[0] = ((e.clientX - r.left) / r.width) * 4 - 2;
        ptr[1] = 2 - ((e.clientY - r.top) / r.height) * 4;
      };
      const onLeave = () => {
        ptr[0] = ptr[1] = 4;
      };
      const onLost = () => {
        failed = true;
        stop();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();
      el.appendChild(canvas);
      el.dataset.live = 'true';
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('webglcontextlost', onLost);
      document.addEventListener('visibilitychange', kick);
      kick();

      const stop = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('webglcontextlost', onLost);
        document.removeEventListener('visibilitychange', kick);
        bufs.forEach((b) => gl.deleteBuffer(b));
        gl.deleteProgram(prog);
        canvas.remove();
        delete el.dataset.live;
        teardown = null;
      };
      teardown = stop;
      (el as HTMLDivElement & { __kick?: () => void }).__kick = kick;
    };

    const update = () => {
      const allowed = !reduce.matches && !small.matches && document.documentElement.dataset.motion !== 'off' && !failed;
      if (!allowed) return teardown?.();
      if (!visible) return;
      if (!teardown) start();
      else (el as HTMLDivElement & { __kick?: () => void }).__kick?.();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(el);
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    reduce.addEventListener('change', update);
    small.addEventListener('change', update);
    return () => {
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener('change', update);
      small.removeEventListener('change', update);
      teardown?.();
    };
  }, [variant]);

  const shape = SHAPES[index];
  return (
    <div ref={host} aria-hidden="true" className={cn('signal-visual', `signal-${variant}`, className)}>
      <div className={`signal-fallback shape-${shape}`}>
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="signal-center-label">
        <SignalText key={shape}>{shape.toUpperCase()}</SignalText>
      </span>
    </div>
  );
}
