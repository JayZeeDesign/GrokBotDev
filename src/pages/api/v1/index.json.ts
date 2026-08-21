// §7.1.4 — site meta, per-type counts, and the endpoint directory. Each descriptor's
// `count` is that endpoint's own count at build time.
import type { APIRoute } from 'astro';
import categories from '../../../data/categories.json';
import { allCollections, allPlugins, allUseCases, hubEligible } from '../../../lib/entries';
import { SITE_URL, envelope, included, integrationItems, jsonResponse } from '../../../lib/api';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, hubPool] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    hubEligible(),
  ]);
  const p = included(plugins).length;
  const u = included(useCases).length;
  const c = included(collections).length;
  const latestCount = Math.min(50, p + u + c);
  const integrationCount = integrationItems(included(hubPool)).length;

  const items = [
    { name: 'index', url: `${SITE_URL}/api/v1/index.json`, description: 'Site meta, counts, endpoint directory', count: 7 },
    { name: 'latest', url: `${SITE_URL}/api/v1/latest.json`, description: '50 newest entries across all types', count: latestCount },
    { name: 'plugins', url: `${SITE_URL}/api/v1/plugins.json`, description: 'All plugins', count: p },
    { name: 'use_cases', url: `${SITE_URL}/api/v1/use-cases.json`, description: 'All use cases with full prompt text', count: u },
    { name: 'collections', url: `${SITE_URL}/api/v1/collections.json`, description: 'All collections', count: c },
    { name: 'categories', url: `${SITE_URL}/api/v1/categories.json`, description: 'Category tree with counts', count: categories.length },
    { name: 'integrations', url: `${SITE_URL}/api/v1/integrations.json`, description: 'Integration vocabulary with counts', count: integrationCount },
  ];

  return jsonResponse(
    envelope(items, {
      site: {
        name: 'grokbot.dev',
        base_url: `${SITE_URL}/`,
        description:
          'Open directory of ready-to-use Grok Bot prompts, plugins, and collections. Static JSON API, RSS feeds, MCP at mcp.grokbot.dev.',
        agent_contract_url: `${SITE_URL}/agent/`,
        submit_url: `${SITE_URL}/submit/`,
        repo_url: 'https://github.com/ZeroPointRepo/GrokBotDev',
        mcp_url: 'https://mcp.grokbot.dev/mcp',
        api_version: 'v1',
      },
      counts: { plugins: p, use_cases: u, collections: c },
    })
  );
};
