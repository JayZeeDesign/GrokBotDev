create table if not exists identities (
  id uuid primary key,
  kind text not null default 'human' check (kind in ('human','bot')),
  created_at timestamptz not null default now(),
  turnstile_passed_at timestamptz,
  x_user_id text null,
  x_handle text null,
  trust_tier smallint not null default 0
);

create table if not exists api_keys (
  id uuid primary key,
  identity_id uuid not null references identities(id) on delete cascade,
  key_hash bytea not null,
  label text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create table if not exists vote_events (
  seq bigserial primary key,
  at timestamptz not null default now(),
  identity_id uuid not null references identities(id) on delete restrict,
  slug text not null,
  action text not null check (action in ('cast','uncast')),
  weight real not null check (weight in (0, 1)),
  ip_hash bytea not null,
  ip24_hash bytea not null,
  ua_hash bytea not null,
  asn int null,
  signals jsonb not null default '{}'::jsonb,
  prev_hash bytea not null,
  row_hash bytea not null
);

create table if not exists votes (
  identity_id uuid not null references identities(id) on delete cascade,
  slug text not null,
  weight real not null check (weight in (0, 1)),
  at timestamptz not null default now(),
  primary key (identity_id, slug)
);

create table if not exists vote_counts (
  slug text primary key,
  visible_count int not null default 0 check (visible_count >= 0),
  raw_count int not null default 0 check (raw_count >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists audit_log (
  id bigserial primary key,
  at timestamptz not null default now(),
  actor text not null,
  action text not null,
  target text not null,
  detail jsonb not null default '{}'::jsonb
);

create index if not exists idx_identities_created_at on identities(created_at);
create index if not exists idx_vote_events_slug_at on vote_events(slug, at desc);
create index if not exists idx_vote_events_identity on vote_events(identity_id, seq desc);
create index if not exists idx_vote_events_ip24_slug on vote_events(slug, ip24_hash) where action = 'cast';
create index if not exists idx_vote_events_signals_gin on vote_events using gin (signals);
create index if not exists idx_votes_slug on votes(slug);
create index if not exists idx_vote_counts_updated_at on vote_counts(updated_at desc);
create index if not exists idx_audit_log_action_target on audit_log(action, target, at desc);
