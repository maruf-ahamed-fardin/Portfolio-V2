'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/data';

const rows = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}`, Icon: Phone },
  { label: 'Location', value: site.location, href: '', Icon: MapPin },
];

const field =
  'contact-field w-full rounded-none border border-line-2 bg-white/[0.015] px-[18px] text-[15px] text-ink placeholder:text-[#7a7a7a] outline-none transition-[border-color,background] duration-300 hover:border-white/35 focus:border-white/60 focus:bg-white/[0.03]';
const label = 'font-mono text-[8px] tracking-[1.4px] text-mute uppercase';

// EmailJS keys come from .env.local; without them the form falls back to the visitor's mail app
const emailjsKeys = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

const statusText: Record<Status, string> = {
  idle: 'Send message',
  sending: 'Sending…',
  sent: 'Message sent — thank you!',
  error: 'Couldn’t send — try again',
  mailto: 'Opening your mail app…',
};

/** Contact section body: intro + contact rows on the left, a message card (EmailJS, mailto fallback) on the right. */
export default function ContactPanel() {
  const [status, setStatus] = useState<Status>('idle');

  const settle = (next: Status) => {
    setStatus(next);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get('name') || '').trim();
    const from = String(f.get('email') || '').trim();
    const msg = String(f.get('message') || '').trim();

    const { service, template, publicKey } = emailjsKeys;
    if (!service || !template || !publicKey) {
      const subject = name ? `Hello from ${name}` : 'Hello from your portfolio';
      const body = `${msg}

— ${name || 'Someone'}${from ? ` (${from})` : ''}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return settle('mailto');
    }

    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        service,
        template,
        { name, email: from, reply_to: from, message: msg, title: `Portfolio message from ${name}`, time: new Date().toLocaleString() },
        { publicKey }
      );
      form.reset();
      settle('sent');
    } catch {
      settle('error');
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,0.98fr)] lg:items-center lg:gap-[clamp(40px,5vw,80px)]">
      {/* intro */}
      <div>
        <p
          className="mt-8 inline-flex items-center gap-3 border border-line-2 px-4 py-2.5 font-mono text-[9px] tracking-[1.6px] text-[#c9c9c9] md:mt-9"
        >
          <span className="size-[6px] rounded-full bg-ember" />
          OPEN TO MEANINGFUL OPPORTUNITIES
        </p>

        <h2 className="interfere mt-5 font-display text-[clamp(42px,12vw,72px)] leading-[1.02] font-normal tracking-[-0.035em] md:text-[clamp(48px,5.4vw,86px)]">
          Something great
          <br />
          starts with{' '}
          <em className="pr-[0.05em]">a hello.</em>
        </h2>

        <p className="mt-4 max-w-[520px] text-sm leading-[1.8] text-mute">
          Full-time roles, freelance builds, AI products. If our worlds overlap, I’d love to hear from you.
        </p>

        <ul className="mt-6 border-b border-line">
          {rows.map((r, i) => {
            const inner = (
              <>
                <span className="font-mono text-[8px] text-[#7a7a7a]">0{i + 1}</span>
                <r.Icon strokeWidth={1.4} className="size-4 text-[#c9c9c9] transition-colors duration-300 group-hover:text-ember" />
                <span className="hidden font-mono text-[8px] tracking-[1.4px] text-mute uppercase sm:block">{r.label}</span>
                <span className="min-w-0 text-sm [overflow-wrap:anywhere] text-ink transition-transform duration-500 ease-expo group-hover:translate-x-1.5 sm:truncate sm:text-[15px] md:text-base">
                  {r.value}
                </span>
                {r.href ? (
                  <ArrowUpRight
                    strokeWidth={1.5}
                    className="size-3 text-[#a99b8b] transition-[transform,color] duration-500 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember"
                  />
                ) : (
                  <span />
                )}
              </>
            );
            const cls =
              'group relative grid grid-cols-[22px_18px_1fr_14px] items-center gap-4 py-3.5 sm:grid-cols-[22px_18px_80px_1fr_14px] sm:gap-5';
            return (
              <li key={r.label} className="c-row relative border-t border-line">
                {r.href ? (
                  <a
                    href={r.href}
                    className={`${cls} transition-[background] duration-500 hover:bg-white/[0.02]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* message card */}
      <form
        onSubmit={onSubmit}
        className="relative isolate border border-line-2 bg-[#0a0a0a] p-6 md:px-8 md:py-7"
      >
        {/* corner brackets */}
        {['-top-px -left-px border-t border-l', '-top-px -right-px border-t border-r', '-bottom-px -left-px border-b border-l', '-bottom-px -right-px border-b border-r'].map(
          (pos) => (
            <span key={pos} aria-hidden="true" className={`pointer-events-none absolute size-4 border-white/45 ${pos}`} />
          )
        )}
        {/* travelling light along the top edge */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px h-px overflow-hidden">
          <span className="contact-beam absolute inset-y-0 w-2/5 bg-[linear-gradient(90deg,transparent,rgba(241,238,232,0.55),transparent)]" />
        </span>

        <div className="flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-[8px] tracking-[1.6px] uppercase">
          <span className="text-ink">New message</span>
          <span className="flex items-center gap-2 text-mute">
            <span className="size-[6px] rounded-full bg-ember" />
            Usually replies in 24h
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-5">
          <label className="grid gap-2.5">
            <span className={label}>Name</span>
            <input name="name" autoComplete="name" required placeholder="Your name" className={`${field} h-12`} />
          </label>
          <label className="grid gap-2.5">
            <span className={label}>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="you@email.com" className={`${field} h-12`} />
          </label>
        </div>
        <label className="mt-5 grid gap-2.5">
          <span className={label}>Message</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell me about the project, role or idea…"
            className={`${field} min-h-[110px] resize-y py-3.5 leading-[1.7]`}
          />
        </label>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group sweep sweep-bright mt-6 flex h-[54px] w-full disabled:cursor-wait disabled:opacity-80 items-center justify-between bg-cream px-6 text-[15px] text-[#17120d] transition-[background,box-shadow] duration-300 hover:bg-ink"
        >
          <span key={status} className="animate-swap" aria-live="polite">
            {statusText[status]}
          </span>
          <ArrowUpRight
            strokeWidth={1.5}
            className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
        <p className="mt-3 font-mono text-[8px] tracking-[0.4px] text-[#7a7a7a]">Sends straight to my inbox. I usually reply within a day.</p>
      </form>
    </div>
  );
}
