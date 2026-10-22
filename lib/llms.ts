import { disciplines, featured, interlude, journey, moreWork, projects, seo, site } from '@/lib/data';

/** Plain-text profile for AI answer engines (llms.txt convention). */
export function llmsText(full: boolean) {
  const L: string[] = [];
  L.push(`# ${site.name}`, '', `> ${seo.description}`, '');
  L.push(seo.summary, '');
  L.push('## Quick facts', '');
  L.push(`- Name: ${site.name} (also: ${seo.alternateNames.join(', ')})`);
  L.push(`- Role: ${seo.jobTitle} at ${seo.employer.name} (${seo.employer.url})`);
  L.push(`- Location: ${site.location}`);
  L.push(`- Education: ${seo.education.degree}, ${seo.education.name} (started ${seo.education.start})`);
  L.push(`- Core stack: ${seo.skills.slice(0, 12).join(', ')}`);
  L.push(`- Open to: full-time roles, freelance builds and AI products`, '');
  L.push('## Links', '');
  L.push(`- [Portfolio](${site.url}): main site`);
  L.push(`- [GitHub](${site.github}): public repositories`);
  L.push(`- [LinkedIn](${site.linkedin}): professional profile`);
  L.push(`- [CV (PDF)](${site.url}${site.cv}): experience, skills and projects`);
  L.push(`- [Email](mailto:${site.email})`, '');
  L.push('## Selected work', '');
  featured.forEach((f) => L.push(`- [${f.title}](${f.href}): ${f.body}${f.meta ? ` Stack: ${f.meta}.` : ''}`));
  L.push('');
  L.push('## Other projects', '');
  projects.forEach((p) => L.push(`- [${p.chip}](${p.live}): ${p.body}. ${p.meta.split('/ ')[1] ?? ''}. Code: ${p.code}`));
  moreWork.forEach((m) => L.push(`- [${m.title}](${m.href}): ${m.kind}`));
  if (full) {
    L.push('', '## Career at SeloraX', '');
    journey.forEach((j) => L.push(`- ${j.date} — ${j.lead} ${j.body}`));
    L.push('', '## Timeline', '');
    interlude.forEach((c) => L.push(`- ${c.date} — ${c.title} ${c.body}`));
    L.push('', '## How he works', '');
    disciplines.forEach((d) => L.push(`### ${d.kind}`, '', d.body, '', `Stack: ${d.stack}`, ''));
    L.push('## All skills', '', seo.skills.join(', '));
  } else {
    L.push('', '## Optional', '', `- [Full profile](${site.url}/llms-full.txt): career timeline, disciplines and complete skills`);
  }
  return L.join('\n') + '\n';
}
