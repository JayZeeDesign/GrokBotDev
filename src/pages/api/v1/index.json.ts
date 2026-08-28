// §7.1.4 — site meta, per-type counts, and the endpoint directory. Each descriptor's
// `count` is that endpoint's own count at build time.
import type { APIRoute } from 'astro';
import categories from '../../../data/categories.json';
import { allCollections, allPlugins, allUseCases, hubEligible } from '../../../lib/entries';
import { allNews } from '../../../lib/news';
import { allTemplates, includedTemplates } from '../../../lib/templates';
import { SITE_URL, envelope, included, integrationItems, jsonResponse } from '../../../lib/api';
import { STABILITY } from '../../../lib/apiMeta';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, hubPool, news, templates] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    hubEligible(),
    allNews(),
    allTemplates(),
  ]);
  const p = included(plugins).length;
  const u = included(useCases).length;
  const c = included(collections).length;
  const n = news.length;
  const t = includedTemplates(templates).length;
  const latestCount = Math.min(50, p + u + c);
  const integrationCount = integrationItems(included(hubPool)).length;

  const items = [
    { name: 'index', url: `${SITE_URL}/api/v1/index.json`, description: 'Site meta, counts, endpoint directory', count: 11 },
    { name: 'status', url: `${SITE_URL}/api/v1/status.json`, description: 'API self-description: version, capabilities, notices, deprecations, changelog. Poll this to learn if the API changed.', count: 0 },
    { name: 'feed', url: `${SITE_URL}/api/v1/feed.json`, description: "RECOMMENDED. Complete lean feed (plugins, use cases, collections, news and shareable-bot templates), newest first. News items carry type 'news'; templates carry type 'template' plus share_url and includes.", count: p + u + c + n + t },
    { name: 'templates', url: `${SITE_URL}/api/v1/templates.json`, description: 'Shareable Bots: Grok Bot templates people shared on X, each with its sharer, tags and share_url (the Add to Grok Bot link). Per-entry detail: /api/v1/templates/<slug>.json', count: t },
    { name: 'news', url: `${SITE_URL}/api/v1/news.json`, description: 'News list: releases, deals, announcements and updates. Per-item detail: /api/v1/news/<slug>.json', count: n },
    { name: 'latest', url: `${SITE_URL}/api/v1/latest.json`, description: '50 newest plugins, use cases and collections (full records)', count: latestCount },
    { name: 'plugins', url: `${SITE_URL}/api/v1/plugins.json`, description: 'All plugins (full records). Per-entry detail: /api/v1/plugins/<slug>.json', count: p },
    { name: 'use_cases', url: `${SITE_URL}/api/v1/use-cases.json`, description: 'All use cases with full prompt text. Per-entry detail: /api/v1/use-cases/<slug>.json', count: u },
    { name: 'collections', url: `${SITE_URL}/api/v1/collections.json`, description: 'All collections. Per-entry detail: /api/v1/collections/<slug>.json', count: c },
    { name: 'categories', url: `${SITE_URL}/api/v1/categories.json`, description: 'Category tree with counts', count: categories.length },
    { name: 'integrations', url: `${SITE_URL}/api/v1/integrations.json`, description: 'Integration vocabulary with counts', count: integrationCount },
  ];

  return jsonResponse(
    envelope(items, {
      site: {
        name: 'grokbot.dev',
        base_url: `${SITE_URL}/`,
        description:
          'Open directory of ready-to-use Grok Bot prompts, plugins, collections, and news. Static JSON API, RSS feeds, MCP at mcp.grokbot.dev.',
        agent_contract_url: `${SITE_URL}/agent/`,
        submit_url: `${SITE_URL}/submit/`,
        repo_url: 'https://github.com/ZeroPointRepo/GrokBotDev',
        mcp_url: 'https://mcp.grokbot.dev/mcp',
        api_version: 'v1',
        status_url: `${SITE_URL}/api/v1/status.json`,
        stability: STABILITY,
      },
      counts: { plugins: p, use_cases: u, collections: c, news: n, templates: t },
    })
  );
};
