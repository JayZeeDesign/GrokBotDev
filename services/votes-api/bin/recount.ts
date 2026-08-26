#!/usr/bin/env tsx
import { loadConfig } from '../src/config.js';
import { connect } from '../src/db/client.js';
import { rebuildMaterializedVotes, verifyLedger } from '../src/db/recount-core.js';

const cfg = loadConfig();
const db = connect(cfg.adminDatabaseUrl, 1);
try {
  const verification = await verifyLedger(db);
  if (!verification.ok) {
    console.error(JSON.stringify({ ok: false, step: 'verify_hash_chain', events: verification.events, errors: verification.errors }, null, 2));
    process.exit(1);
  }
  const rebuilt = await rebuildMaterializedVotes(db);
  const counts = await db<{ slugs: number; visibleTotal: number; rawTotal: number }[]>`
    select count(*)::int as slugs, coalesce(sum(visible_count), 0)::int as visible_total, coalesce(sum(raw_count), 0)::int as raw_total
    from vote_counts
  `;
  console.log(JSON.stringify({ ok: true, hash_chain: 'clean', events: verification.events, ...rebuilt, counts: counts[0] }, null, 2));
} finally {
  await db.end({ timeout: 5 });
}
