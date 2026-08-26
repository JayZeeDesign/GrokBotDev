#!/usr/bin/env tsx
import { loadConfig } from '../src/config.js';
import { connect } from '../src/db/client.js';

const cfg = loadConfig();
const db = connect(cfg.adminDatabaseUrl, 1);
try {
  const [totals] = await db<{
    identities: number;
    events24h: number;
    casts24h: number;
    uncasts24h: number;
    visibleTotal: number;
    rawTotal: number;
  }[]>`
    select
      (select count(*)::int from identities) as identities,
      (select count(*)::int from vote_events where at >= now() - interval '24 hours') as events24h,
      (select count(*)::int from vote_events where at >= now() - interval '24 hours' and action = 'cast') as casts24h,
      (select count(*)::int from vote_events where at >= now() - interval '24 hours' and action = 'uncast') as uncasts24h,
      (select coalesce(sum(visible_count), 0)::int from vote_counts) as visible_total,
      (select coalesce(sum(raw_count), 0)::int from vote_counts) as raw_total
  `;
  const top = await db<{ slug: string; visibleCount: number; rawCount: number }[]>`
    select slug, visible_count, raw_count from vote_counts order by visible_count desc, raw_count desc, slug asc limit 20
  `;
  const flags = await db<{ flag: string; events: number }[]>`
    select flag, count(*)::int as events
    from vote_events, lateral jsonb_array_elements_text(signals->'flags') as flag
    where at >= now() - interval '24 hours'
    group by flag
    order by events desc
  `;
  console.log(JSON.stringify({ ok: true, generated_at: new Date().toISOString(), totals, top, flags }, null, 2));
} finally {
  await db.end({ timeout: 5 });
}
