import type { ComponentProps, ReactNode } from 'react';
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from '@/components/primitives';
import type { SocialKey } from '@/lib/data';

export const socialIcons: Record<SocialKey, (p: ComponentProps<'svg'>) => ReactNode> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};
