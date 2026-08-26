revoke all on schema public from public;
grant usage on schema public to votes_app, votes_admin;

grant select on identities, api_keys, vote_events, votes, vote_counts, audit_log to votes_app;
grant insert, update on identities to votes_app;
grant insert on vote_events to votes_app;
grant insert, update, delete on votes to votes_app;
grant insert, update on vote_counts to votes_app;
grant insert on audit_log to votes_app;
grant usage, select on sequence vote_events_seq_seq, audit_log_id_seq to votes_app;

revoke update, delete on vote_events from votes_app;

grant select, insert, update, delete on identities, api_keys, vote_events, votes, vote_counts, audit_log to votes_admin;
grant usage, select, update on all sequences in schema public to votes_admin;
