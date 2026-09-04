/** A link shown in the hero and footer.
 *  `icon` is any name from src/components/Icon.astro */
export interface SocialLink {
  url: string;
  label: string;
  icon?:
    | 'github'
    | 'linkedin'
    | 'email'
    | 'rss'
    | 'download'
    | 'arrow-right'
    | 'arrow-left'
    | 'sun'
    | 'moon';
}

/**
 * ─────────────────────────────────────────────────────────────
 *  Site identity — the one file you must edit first.
 *  Everything on the site (titles, meta tags, footer, hero
 *  social links) reads from here.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  /** Your full name — used for <title> and meta tags */
  title: 'Jon Hunt',
  /** Short handle used after the dot in page titles ("About · rowanhale") */
  shortTitle: 'JonHunt',
  /** Default meta description for pages that don't set their own */
  description:
    'Coding obsessed web developer and scientist.',
  /** Your production URL — no trailing slash. Used for canonical URLs, OG tags, RSS and sitemap */
  url: 'https://jonhunt.dev',
  author: {
    name: 'Jon Hunt',
    email: 'hello@jonhunt.dev',
    location: 'Chicago, IL',
  },
  /** Shown in the hero and footer. Delete a line to remove it from both places.
   *  `icon` is any name from src/components/Icon.astro */
  socials: {
    github: { url: 'https://github.com/JonHunt1995', label: 'GitHub', icon: 'github' },
    linkedin: { url: 'https://www.linkedin.com/in/jonathan-hunt-45267731b/', label: 'LinkedIn', icon: 'linkedin' },
    email: { url: 'mailto:hello@jonhunt.dev', label: 'Email', icon: 'email' },
    rss: { url: '/rss.xml', label: 'RSS', icon: 'rss' },
  } satisfies Record<string, SocialLink>,
};

export type SocialKey = keyof typeof site.socials;

/**
 * Prefix a root-relative path ("/img/x.jpg") with the configured base
 * path (`base` in astro.config.mjs). Anything else — external URLs,
 * mailto:/tel: links, already-prefixed paths — passes through
 * untouched. Use it for every internal link and public/ asset so the
 * site works at a subpath (e.g. GitHub Pages project sites) as well as
 * at the domain root.
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!path.startsWith('/')) return path;
  if (path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
};
