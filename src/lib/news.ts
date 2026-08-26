import { getCollection, type CollectionEntry } from 'astro:content';
import { envelope, SITE_URL } from './api';
import { CP_145_NEWS_OPEN_LABEL } from './copy';

export type NewsDoc = CollectionEntry<'news'>;
export type NewsKind = 'release' | 'deal' | 'update' | 'announcement';

type SourceTweetData = {
  url: string;
  author_handle: string;
  excerpt: string;
  posted_at?: string;
};

export function newsUrlOf(doc: NewsDoc): string {
  return `/news/${doc.data.slug}/`;
}

export function newsDetailUrl(doc: NewsDoc): string {
  return `${SITE_URL}/api/v1/news/${doc.data.slug}.json`;
}

export function isPublishedNews(doc: NewsDoc): boolean {
  return doc.data.status === 'live';
}

export function sortNews(docs: NewsDoc[]): NewsDoc[] {
  return [...docs].sort((a, b) =>
    a.data.published_at === b.data.published_at
      ? a.data.slug.localeCompare(b.data.slug)
      : a.data.published_at < b.data.published_at
        ? 1
        : -1
  );
}

export async function allNews(): Promise<NewsDoc[]> {
  return sortNews((await getCollection('news')).filter(isPublishedNews) as NewsDoc[]);
}

function sourceTweets(tweets: SourceTweetData[] = []) {
  return tweets.map((tweet) => ({
    url: tweet.url,
    author_handle: tweet.author_handle,
    excerpt: tweet.excerpt,
    posted_at: tweet.posted_at ?? null,
  }));
}

function newsSource(doc: NewsDoc): Record<string, unknown> | null {
  const tweet = doc.data.source_tweets[0];
  if (tweet) return { platform: 'x', label: `@${tweet.author_handle}`, url: tweet.url };
  if (doc.data.external_url) {
    return {
      platform: 'web',
      label: new URL(doc.data.external_url).host.replace(/^www\./, ''),
      url: doc.data.external_url,
    };
  }
  return null;
}

function newsCtaLabel(doc: NewsDoc): string | null {
  if (!doc.data.external_url) return null;
  return doc.data.cta_label ?? CP_145_NEWS_OPEN_LABEL;
}

export function toNewsIndexItem(doc: NewsDoc): Record<string, unknown> {
  const d = doc.data;
  return {
    slug: d.slug,
    title: d.title,
    summary: d.summary,
    kind: d.kind,
    important: d.important,
    external_url: d.external_url ?? null,
    cta_label: newsCtaLabel(doc),
    published_at: d.published_at,
    detail_url: newsDetailUrl(doc),
  };
}

export function toNewsFeedItem(doc: NewsDoc): Record<string, unknown> {
  const d = doc.data;
  const pageUrl = `${SITE_URL}${newsUrlOf(doc)}`;
  return {
    type: 'news',
    slug: d.slug,
    url: pageUrl,
    detail_url: newsDetailUrl(doc),
    title: d.title,
    headline: d.title,
    summary: d.summary,
    kind: d.kind,
    important: d.important,
    external_url: d.external_url ?? null,
    cta_label: newsCtaLabel(doc),
    source: newsSource(doc),
    categories: [],
    awesome_score: null,
    format: null,
    featured: d.important,
    added_at: d.published_at,
    published_at: d.published_at,
    updated_at: d.updated_at,
  };
}

export function toNewsApiItem(doc: NewsDoc): Record<string, unknown> {
  const d = doc.data;
  return {
    type: 'news',
    slug: d.slug,
    url: `${SITE_URL}${newsUrlOf(doc)}`,
    detail_url: newsDetailUrl(doc),
    title: d.title,
    summary: d.summary,
    kind: d.kind,
    important: d.important,
    external_url: d.external_url ?? null,
    cta_label: newsCtaLabel(doc),
    source_tweets: sourceTweets(d.source_tweets),
    published_at: d.published_at,
    updated_at: d.updated_at,
    status: d.status,
    body: (doc.body ?? '').trim(),
  };
}

export function newsEnvelope(docs: NewsDoc[]) {
  return envelope(sortNews(docs).map(toNewsIndexItem));
}
