// §7.2 — RSS 2.0 feeds (Ruling 2: RSS, not Atom; /rss.xml + the two lane feeds).
// Items are the included entries (§7.1.1: live + needs-update; never deprecated or demo),
// newest `added_at` first with slug as the tie-break — the same order as the API.
import type { AnyDoc } from './entries';
import { urlOf } from './entries';
import { apiSort, included, SITE_URL } from './api';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rssFeed(opts: { title: string; description: string; path: string; docs: AnyDoc[] }) {
  const items = apiSort(included(opts.docs))
    .map((doc) => {
      const url = `${SITE_URL}${urlOf(doc)}`;
      return `    <item>
      <title>${escape(doc.data.name)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(doc.data.tagline)}</description>
      <pubDate>${new Date(doc.data.added_at).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(opts.title)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}${opts.path}" rel="self" type="application/rss+xml" />
    <description>${escape(opts.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
