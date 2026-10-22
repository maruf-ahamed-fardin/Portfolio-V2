import type { MetadataRoute } from 'next';
import { site } from '@/lib/data';

// Search engines and AI answer engines are all explicitly welcome.
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot',
  'meta-externalagent', 'CCBot', 'cohere-ai', 'DuckAssistBot', 'YouBot', 'Amazonbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
