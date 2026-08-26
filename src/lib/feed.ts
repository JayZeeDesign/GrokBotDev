// §7.2 — RSS 2.0 feeds (Ruling 2: RSS, not Atom; /rss.xml + the two lane feeds).
// Items are the included entries (§7.1.1: live + needs-update; never deprecated or demo),
// newest `added_at` first with slug as the tie-break — the same order as the API.
import type { AnyDoc, UseCaseDoc } from './entries';
import { kindOf, primarySourceOf, summaryOf, titleOf, urlOf } from './entries';
import { apiSort, included, SITE_URL } from './api';
import type { NewsDoc } from './news';
import { newsUrlOf, sortNews } from './news';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * F17 — the feed's own namespace, so an item can name its primary source.
 *
 * RSS 2.0 has no field for "where this came from" — `<source>` means the channel an item was
 * republished FROM, which is a different claim and would be a lie here. Foreign markup in an
 * `<item>` is explicitly allowed by the spec provided it is namespaced, so the kind ships as
 * `<gb:primary_source>` rather than being crammed into `<description>` or dropped. Existing
 * readers ignore an unknown namespace; nothing about the visible feed changes.
 *
 * This is what "exposed non-lossily through both lane feeds" costs: one attribute set. The
 * alternative — omitting it — would mean the API and the feeds disagreed about what an entry
 * is sourced from, and a machine consumer picking the feed would silently get the older
 * world-model.
 */
const GB_NS = 'https://grokbot.dev/ns/feed';

function primarySourceElement(doc: AnyDoc): string {
  if (kindOf(doc) !== 'use-case') return '';
  const source = primarySourceOf(doc as UseCaseDoc);
  if (!source) return '';
  const attrs: Array<[string, string]> = [
    ['kind', source.kind],
    ['url', source.url],
  ];
  if (source.kind === 'youtube-video') {
    attrs.push(['title', source.title], ['channel', source.channel]);
    if (source.timestamp) attrs.push(['timestamp', source.timestamp]);
    if (source.startSeconds !== undefined) attrs.push(['start', String(source.startSeconds)]);
  } else {
    attrs.push(['author_handle', source.authorHandle]);
  }
  const rendered = attrs.map(([k, v]) => `${k}="${escape(v)}"`).join(' ');
  return `\n      <gb:primary_source ${rendered} />`;
}

type RssDoc = AnyDoc | NewsDoc;

const isNewsDoc = (doc: RssDoc): doc is NewsDoc => doc.data.type === 'news';

function docUrl(doc: RssDoc): string {
  return `${SITE_URL}${isNewsDoc(doc) ? newsUrlOf(doc) : urlOf(doc)}`;
}

function docTitle(doc: RssDoc): string {
  return isNewsDoc(doc) ? doc.data.title : titleOf(doc);
}

function docDescription(doc: RssDoc): string {
  return isNewsDoc(doc) ? doc.data.summary : summaryOf(doc);
}

function docDate(doc: RssDoc): string {
  return isNewsDoc(doc) ? doc.data.published_at : doc.data.added_at;
}

function newsElement(doc: RssDoc): string {
  if (!isNewsDoc(doc)) return primarySourceElement(doc);
  const attrs: Array<[string, string]> = [
    ['kind', doc.data.kind],
    ['important', String(doc.data.important)],
  ];
  if (doc.data.external_url) attrs.push(['external_url', doc.data.external_url]);
  const rendered = attrs.map(([k, v]) => `${k}="${escape(v)}"`).join(' ');
  return `\n      <gb:news ${rendered} />`;
}

function sortRssDocs(docs: RssDoc[]): RssDoc[] {
  const entryDocs = docs.filter((doc): doc is AnyDoc => !isNewsDoc(doc));
  const newsDocs = docs.filter(isNewsDoc);
  return [...apiSort(included(entryDocs)), ...sortNews(newsDocs)].sort((a, b) =>
    docDate(a) === docDate(b)
      ? (a.data.slug as string).localeCompare(b.data.slug as string)
      : docDate(a) < docDate(b)
        ? 1
        : -1
  );
}

export function rssFeed(opts: { title: string; description: string; path: string; docs: RssDoc[] }) {
  const items = sortRssDocs(opts.docs)
    .map((doc) => {
      const url = docUrl(doc);
      return `    <item>
      <title>${escape(docTitle(doc))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(docDescription(doc))}</description>
      <pubDate>${new Date(docDate(doc)).toUTCString()}</pubDate>${newsElement(doc)}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:gb="${GB_NS}">
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
