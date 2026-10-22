import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignalText from '@/components/client/SignalText';

/** Inline style helper for staggered reveal delays. */
export const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

export function SectionHead({ label, aside, signal }: { label: string; aside?: string; signal?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-line pt-5 md:items-center">
      <span className="inline-flex items-center gap-[9px] font-mono text-[8px] leading-[1.65] tracking-[1.6px] text-sand uppercase before:size-[5px] before:bg-ember/80 md:gap-3 md:text-[11px] md:before:size-[7px]">
        {signal ? <SignalText>{label.toUpperCase()}</SignalText> : label}
      </span>
      {aside && <span className="caption hidden text-right text-[#9d9d9d] md:block">{aside}</span>}
    </div>
  );
}

type ULinkProps = ComponentProps<'a'> & { small?: boolean; tone?: 'ink' | 'warm' | 'cream'; icon?: boolean };

/** Underlined text link with a nudging arrow — the site's main link style. */
export function ULink({ small, tone = 'ink', icon = true, className, children, ...props }: ULinkProps) {
  const external = typeof props.href === 'string' && /^(https?:|mailto:|tel:|\/.+\.pdf)/.test(props.href);
  return (
    <a
      {...(external && !props.href!.startsWith('mailto') && !props.href!.startsWith('tel') ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
      className={cn(
        'group/ul inline-flex items-center border-b pb-[7px] transition-[color,gap] duration-200 hover:text-ember',
        small ? 'gap-1.5 pb-[5px] text-[11px]' : 'gap-5 text-xs hover:gap-7',
        tone === 'ink' && 'border-[#6e6e6e] text-ink',
        tone === 'warm' && 'border-warm/45 text-warm',
        tone === 'cream' && 'border-[#e1c9ae]/35 text-[#e1c9ae]',
        className
      )}
    >
      {children}
      {icon && (
        <ArrowUpRight
          strokeWidth={1.5}
          className="size-3 transition-transform duration-300 group-hover/ul:translate-x-[3px] group-hover/ul:-translate-y-[3px]"
        />
      )}
    </a>
  );
}

/** Two-column header: big serif display on the left, a short lede on the right. */
export function SplitHead({ title, children, className }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-14 flex flex-col items-start gap-6 md:mt-[100px] md:flex-row md:items-end md:justify-between md:gap-10', className)}>
      <h2 className="display interfere">{title}</h2>
      {children && <div className="max-w-[300px] pb-1.5 text-[15px] leading-[1.8] text-soft">{children}</div>}
    </div>
  );
}

export function GitHubIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedInIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function FacebookIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </svg>
  );
}
