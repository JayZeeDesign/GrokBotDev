#!/usr/bin/env node
// One-off generator for plugin batch 1 (operator-supplied agentic tools). Each listing is a
// doc-grounded "integration builder" prompt: it tells the Grok Bot to READ the tool's real
// docs (linked) and wire up the tool via its API/MCP, with hard rules against inventing
// endpoints/fields and a confirm-before-write guard. Research-sourced Aug 2026.
import { writeFileSync } from 'node:fs';

const NOW_ADD = '2026-08-21T00:00:00Z';
const NOW_UPD = '2026-08-21T12:00:00Z';

const PLUGINS = [
  {
    slug: 'postiz', name: 'Postiz', category: 'marketing', subcategory: 'social',
    tagline: 'Let your agent schedule and post across 30+ social platforms.',
    project_url: 'https://postiz.com', works_with: ['X'], setup_minutes: 10,
    pricing_note: 'Open-source core; paid hosted plans.',
    author: { handle: 'postiz', url: 'https://postiz.com', platform: 'web' },
    what: "Postiz is an all-in-one, agent-native social media scheduler. Its MCP server lets an AI agent list your connected accounts, read each platform's posting rules, schedule or publish posts, and even generate images and videos — across 30+ platforms, all through natural language.",
    prompt: "You are setting up a Postiz integration for me inside Grok Bot. First, read Postiz's documentation at https://docs.postiz.com/mcp/introduction so you understand how its MCP server works — authentication with a public API key from Settings → Developers → Public API, and the tools it exposes: listing connected accounts, fetching a platform's posting rules, scheduling or publishing posts, and generating images and videos. Then connect to my Postiz MCP server so that whenever I ask you to schedule, draft, or publish across my social accounts, you use Postiz to do it — pick the right accounts, respect each platform's rules, and post at the time I ask. Rules: follow the documentation exactly and never invent a tool, parameter, or platform Postiz does not list; if I ask for something Postiz cannot do, tell me instead of guessing. Always show me the exact post text, accounts, and time before anything is published, and confirm the connection first by listing my connected accounts.",
  },
  {
    slug: 'post-bridge', name: 'Post Bridge', category: 'marketing', subcategory: 'social',
    tagline: 'Give your agent one API to post to 10+ social platforms.',
    project_url: 'https://www.post-bridge.com', works_with: ['X'], setup_minutes: 10,
    pricing_note: 'API access is a $5/mo add-on.',
    author: { handle: 'post-bridge', url: 'https://www.post-bridge.com', platform: 'web' },
    what: "Post Bridge is one API for publishing and scheduling across 10+ networks — Instagram, TikTok, YouTube, X, LinkedIn and more. It ships a native MCP server and an agent mode so a Grok Bot can upload media and cross-post from a single call.",
    prompt: "You are setting up a Post Bridge integration for me inside Grok Bot. First, read Post Bridge's API reference at https://api.post-bridge.com/reference (and its MCP guide at https://www.post-bridge.com/mcp) so you understand its authentication and the endpoints for uploading media, creating posts, scheduling, and reading analytics, plus which of the 10+ platforms each supports. Then use my Post Bridge API key so that whenever I ask you to cross-post or schedule to my social accounts — Instagram, TikTok, YouTube, X, LinkedIn and the rest — you upload any media and create the post through Post Bridge at the time I specify. Rules: follow the docs exactly, never invent an endpoint or field, and if a platform does not support what I asked, say so. Show me the caption, target platforms, and schedule before publishing, and confirm access first with a read-only call such as listing my connected accounts.",
  },
  {
    slug: 'superx', name: 'SuperX', category: 'marketing', subcategory: 'social',
    tagline: 'Give your agent your X analytics and a 50M-post idea library.',
    project_url: 'https://superx.so', works_with: ['X'], setup_minutes: 10,
    pricing_note: 'API included in every plan.',
    author: { handle: 'superx', url: 'https://superx.so', platform: 'web' },
    what: "SuperX is an X (Twitter) growth tool — scheduling, analytics, AI content and a library of 50M+ real posts. Its REST API and agent skill let a Grok Bot read your metrics, pull proven post structures, and schedule tweets and threads.",
    prompt: "You are setting up a SuperX integration for me inside Grok Bot. First, read SuperX's developer documentation at https://superx.so/developers so you understand its REST API (base URL https://api.superx.so/v1, Bearer API-key auth) — how to read my published posts and their metrics, pull account analytics, list my most engaging followers, create or delete drafts and scheduled posts, and query its library of viral post ideas. Then use my SuperX API key so that when I ask how my X account is doing you pull the real analytics; when I ask for post ideas you reference the library instead of making things up; and when I ask you to schedule a tweet or thread you create it as a draft or scheduled post. Rules: follow the docs exactly, never invent a metric or endpoint, and base every claim about my account on data the API actually returned. Confirm the connection first by reading my recent posts, and show me any tweet before it is scheduled.",
  },
  {
    slug: 'breakcold', name: 'Breakcold', category: 'sales', subcategory: 'crm',
    tagline: 'Let your agent run your CRM across email, LinkedIn and WhatsApp.',
    project_url: 'https://www.breakcold.com', works_with: ['WhatsApp', 'Telegram'], setup_minutes: 10,
    pricing_note: 'Paid CRM; hosted MCP included.',
    author: { handle: 'breakcold', url: 'https://www.breakcold.com', platform: 'web' },
    what: "Breakcold is an AI-native sales CRM with a hosted MCP server (55 tools from its OpenAPI). A Grok Bot can read and write people, companies, deals, tasks and notes, move deals across the pipeline, and read multi-channel threads — email, LinkedIn, WhatsApp and Telegram — in one prompt.",
    prompt: "You are setting up a Breakcold integration for me inside Grok Bot. First, read Breakcold's MCP documentation at https://www.breakcold.com/crm-mcp (and the setup guides at https://github.com/breakcold/mcp) so you understand its hosted MCP server and the tools it exposes — reading and writing people, companies, deals, tasks, notes and custom fields, moving deals across the pipeline/Kanban, and reading conversations across email, LinkedIn, WhatsApp and Telegram. Then connect to my Breakcold MCP server so that when I ask about a contact or deal you answer from the CRM, when I ask you to log or update something you write it back, and when I ask what to do next you read the recent conversations and propose the next step. Rules: follow the documentation exactly, never invent a record, field, or contact, and never send an outbound message or change a deal stage without showing me first and getting my go-ahead. Confirm the connection by reading one of my pipelines before writing anything.",
  },
  {
    slug: 'adkit', name: 'AdKit', category: 'marketing', subcategory: 'ads',
    tagline: 'Let your agent draft and run Meta, Google and TikTok ads.',
    project_url: 'https://adkit.so', works_with: [], setup_minutes: 10,
    pricing_note: '',
    author: { handle: 'adkit', url: 'https://adkit.so', platform: 'web' },
    what: "AdKit is an ads toolbox built for AI agents — a remote MCP server that runs campaigns on Meta, Google and TikTok and browses ad libraries. Its safety model turns every change into a draft first, so a Grok Bot can build campaigns in plain English without risking live spend.",
    prompt: "You are setting up an AdKit integration for me inside Grok Bot. First, read AdKit's documentation at https://adkit.so so you understand its remote MCP server and how it runs ads on Meta, Google and TikTok — creating campaigns, ad sets, budgets, targeting and creatives, and browsing ad libraries — and note its safety model: every change is created as a draft first. Then connect to my AdKit MCP server so that when I ask you to build or adjust a campaign you draft it in plain English through AdKit, and when I want inspiration you pull real ads from the libraries. Rules: follow the documentation exactly and never invent a targeting option, budget field, or metric. Everything stays a draft — never publish, launch, or change spend on a live campaign without showing me the full draft and getting my explicit go-ahead. Confirm access first with a read-only call such as listing my ad accounts.",
  },
  {
    slug: 'distribb', name: 'Distribb', category: 'marketing', subcategory: 'seo',
    tagline: 'Let your agent do SEO — keywords, articles and backlinks.',
    project_url: 'https://distribb.io', works_with: [], setup_minutes: 10,
    pricing_note: 'Plans from $49/mo.',
    author: { handle: 'distribb', url: 'https://distribb.io', platform: 'web' },
    what: "Distribb is agentic SEO software. Through its API and MCP server a Grok Bot can find buyer-intent keywords with real volume and difficulty data, draft articles with your own AI, and publish them through Distribb's backlink network.",
    prompt: "You are setting up a Distribb integration for me inside Grok Bot. First, read Distribb's API documentation at https://distribb.io/api-docs (and its Agentic Mode guide at https://distribb.io/agentic) so you understand its Bearer-token auth and its tools — listing my projects, finding buyer-intent keywords with real volume and difficulty data, creating articles, and publishing them through Distribb's backlink network. Then use my Distribb API key so that when I ask for keywords you return Distribb's real data (never invented volumes), when I ask for an article you draft it and create it in the right project, and when I approve one you publish it. Rules: follow the docs exactly, never fabricate a keyword metric or endpoint, and always show me the article and target keyword before publishing. Confirm the connection first by listing my projects.",
  },
  {
    slug: 'reviews-ai', name: 'Reviews.ai', category: 'marketing', subcategory: 'analytics',
    tagline: 'Let your agent pull and analyze reviews from 100+ platforms.',
    project_url: 'https://reviews.ai', works_with: [], setup_minutes: 10,
    pricing_note: '',
    author: { handle: 'reviews-ai', url: 'https://reviews.ai', platform: 'web' },
    what: "Reviews.ai scrapes and analyzes reviews from 100+ platforms and exposes them through a clean REST API. A Grok Bot can pull the real reviews for a product or brand and summarize sentiment, themes and standout quotes — grounded in actual data, not guesses.",
    prompt: "You are setting up a Reviews.ai integration for me inside Grok Bot. First, read Reviews.ai's API documentation at https://help.reviews.ai/en/articles/5448444-api so you understand its authentication, how it pulls reviews from 100+ platforms, and how to fetch products and filter reviews by brand, category, time period and rating (with pagination up to 100 per page and a 300-requests-per-minute limit). Then use my Reviews.ai API key so that when I ask how a product or brand is being reviewed, you pull the real reviews and summarize the sentiment, recurring themes and standout quotes from exactly what the API returned. Rules: follow the docs exactly, respect the rate limits, never invent a review, rating, or trend, and always tell me the sample size behind any summary. Confirm the connection first with a small read-only request.",
  },
];

const q = (s) => JSON.stringify(s); // valid YAML double-quoted scalar (JSON ⊂ YAML)

for (const p of PLUGINS) {
  const install = [
    `Create a ${p.name} account at ${new URL(p.project_url).host.replace(/^www\./, '')} and connect the accounts or data you want it to reach.`,
    `Get your API key or MCP connection from your ${p.name} dashboard (see the linked docs for the exact place).`,
    `Paste the prompt below into your Grok Bot and give it your ${p.name} key so this becomes a standing capability.`,
  ];
  const fm = [
    '---',
    'type: plugin',
    `name: ${q(p.name)}`,
    `slug: ${p.slug}`,
    `tagline: ${q(p.tagline)}`,
    `category: ${p.category}`,
    `subcategory: ${p.subcategory}`,
    'install_steps:',
    ...install.map((s) => `  - ${q(s)}`),
    `prompt: ${q(p.prompt)}`,
    `works_with: [${p.works_with.map(q).join(', ')}]`,
    `project_url: ${q(p.project_url)}`,
    'author:',
    `  handle: ${q(p.author.handle)}`,
    `  url: ${q(p.author.url)}`,
    `  platform: ${p.author.platform}`,
    ...(p.pricing_note ? [`pricing_note: ${q(p.pricing_note)}`] : []),
    `setup_minutes: ${p.setup_minutes}`,
    'featured: true',
    'sponsor: false',
    `added_at: ${q(NOW_ADD)}`,
    `updated_at: ${q(NOW_UPD)}`,
    `verified_at: ${q(NOW_UPD)}`,
    'status: live',
    '---',
    '',
    '## What it does',
    '',
    p.what,
    '',
    '## Use it in Grok Bot',
    '',
    `Paste the prompt on this page into a Grok Bot and give it a ${p.name} API key or MCP connection. The bot reads ${p.name}'s own documentation first, wires up the integration, and from then on you drive ${p.name} in plain language — it follows the docs and checks with you before anything that writes or spends.`,
    '',
  ].join('\n');
  writeFileSync(`content/plugins/${p.slug}.md`, fm);
  console.log('wrote', `content/plugins/${p.slug}.md`, `(prompt ${p.prompt.length} chars)`);
}
