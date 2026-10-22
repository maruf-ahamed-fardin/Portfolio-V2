import { featured, moreWork, projects, seo, site, socials } from '@/lib/data';

/** Schema.org graph: Person + ProfilePage + WebSite + the projects he built. Read by Google and AI answer engines. */
export default function JsonLd() {
  const personId = `${site.url}/#person`;
  const builds = [
    ...featured.map((f) => ({ name: f.title, description: f.body, url: f.href, image: `${site.url}${f.image}` })),
    ...projects.map((p) => ({ name: `${p.chip} — ${p.title.replace(/\.$/, '')}`, description: p.body, url: p.live, image: `${site.url}${p.image}` })),
    ...moreWork.map((m) => ({ name: m.title, description: m.kind, url: m.href })),
  ];

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        alternateName: [...seo.alternateNames],
        givenName: 'Maruf Ahamed',
        familyName: 'Fardin',
        url: site.url,
        image: `${site.url}/images/maruf.jpg`,
        email: `mailto:${site.email}`,
        jobTitle: seo.jobTitle,
        description: seo.summary,
        worksFor: { '@type': 'Organization', name: seo.employer.name, url: seo.employer.url },
        alumniOf: { '@type': 'CollegeOrUniversity', name: seo.education.name },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Full Stack Developer',
          occupationLocation: { '@type': 'City', name: 'Dhaka' },
          skills: seo.skills.join(', '),
        },
        address: { '@type': 'PostalAddress', addressLocality: seo.locality, addressCountry: seo.country },
        nationality: { '@type': 'Country', name: 'Bangladesh' },
        knowsAbout: [...seo.skills],
        knowsLanguage: ['English', 'Bengali'],
        sameAs: socials.map((s) => s.href),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: seo.shortTitle,
        description: seo.description,
        inLanguage: 'en',
        mainEntity: { '@id': personId },
        about: { '@id': personId },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: seo.description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}/#projects`,
        name: `Projects by ${site.name}`,
        itemListElement: builds.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'CreativeWork', ...b, creator: { '@id': personId } },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
