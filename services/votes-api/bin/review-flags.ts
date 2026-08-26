#!/usr/bin/env tsx
import { loadConfig } from '../src/config.js';
import { connect } from '../src/db/client.js';

const args = process.argv.slice(2);
const get = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const command = args[0] ?? '--list';
const cfg = loadConfig();
const db = connect(cfg.adminDatabaseUrl, 1);

async function list() {
  const rows = await db<{
    flag: string;
    slug: string;
    events: number;
    firstAt: Date;
    lastAt: Date;
    rawIds: string[];
  }[]>`
    select flag, slug, count(*)::int as events, min(at) as first_at, max(at) as last_at, array_agg(seq::text order by seq) as raw_ids
    from vote_events, lateral jsonb_array_elements_text(signals->'flags') as flag
    group by flag, slug
    order by last_at desc
    limit 200
  `;
  console.log(JSON.stringify({ ok: true, flagged_batches: rows }, null, 2));
}

async function review(action: 'bless' | 'bury') {
  const flag = get('--flag') ?? get('-f');
  const slug = get('--slug') ?? get('-s');
  const reason = get('--reason') ?? get('-r');
  if (!flag || !slug || !reason) throw new Error(`${action} requires --flag, --slug, and --reason`);
  await db`
    insert into audit_log (actor, action, target, detail)
    values ('votes_admin_cli', ${action === 'bless' ? 'bless_flag' : 'bury_flag'}, ${`${slug}:${flag}`}, ${db.json({ slug, flag, reason })})
  `;
  console.log(JSON.stringify({ ok: true, action, slug, flag, note: 'audit_log recorded; ledger remains append-only. Run recount after policy review.' }, null, 2));
}

try {
  if (command === '--list' || command === 'list') await list();
  else if (command === 'bless' || command === '--bless') await review('bless');
  else if (command === 'bury' || command === '--bury') await review('bury');
  else throw new Error('usage: review-flags.ts [list|bless|bury] [--slug slug --flag flag --reason reason]');
} finally {
  await db.end({ timeout: 5 });
}
