---
type: use-case
name: "Domain Wrangler · DNS Onboarder"
slug: onboard-parked-domains-to-cloudflare-catch-all
headline: "Ten parked domains onboarded to one catch-all inbox"
summary: "Twilight Surfers had one Grok Bot move about ten domains onto Cloudflare and route all of their mail into a single catch-all address, while a second bot fixed SMTP and contact forms on the leftover WordPress sites and sent live test messages."
categories: [engineering, work]
format: use-case
tagline: "One bot does the DNS and the catch-all, another fixes the WordPress mail."
category: engineering
subcategory: agents-ops
bot_name: "Domain Wrangler"
what_it_does: "One Grok Bot onboards a pile of parked domains to Cloudflare and points every address at one catch-all inbox. A second runs in parallel on the leftover WordPress sites, installing SMTP plugins, wiring the contact forms and sending real test messages."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 90
source_tweets:
  - url: https://x.com/TwilightSurfers/status/2091309409708212723
    author_handle: TwilightSurfers
    excerpt: "Grok bot on lboarded about 10 domains I own to Cloudflare and set up email to one catch all email. Simultaneously another Grok bot set up smtp plugins on some leftover wp sites and configured contact forms and sent tests."
    posted_at: "2026-08-22T23:39:52Z"
author:
  handle: TwilightSurfers
  url: https://x.com/TwilightSurfers
  platform: x
prompt_provenance: curator
replicability: "Twilight Surfers described the run rather than posting a prompt, so the starter below is a curator distillation. To adapt: do one domain end to end before you unleash it on ten, and keep the rule that it proves delivery with a real test send rather than reporting success."
awesome_score: 67
score_breakdown:
  reproducibility: 17
  ambition: 15
  concreteness: 14
  novelty: 12
  evidence: 3
  craft: 6
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Give the first bot your registrar and your Cloudflare account** and the list of domains that have been sitting parked. Twilight Surfers had about ten.
2. **Have it onboard them one at a time:** add the zone, move the nameservers, carry the existing records across, and confirm each zone is actually active before it moves on to the next.
3. **Route all the mail to one place.** Every domain gets a catch-all that forwards into a single inbox, so ten domains stop being ten mailboxes you never check.
4. **Prove delivery rather than declaring it** - a real test message to each catch-all, and the result reported back per domain.
5. **Run a second bot in parallel on the leftover WordPress sites.** It installs the SMTP plugin, configures the contact forms, and sends test submissions through them so you know the forms genuinely reach the inbox.
6. **Let the bots reconcile with each other.** The second bot found a mismatch between the number of processes showing online and the number actually running, and argued the discrepancy out with a CEO bot instead of quietly accepting either number.
7. **Have the CEO bot assign the fix.** In this run it stood up a copywriting bot to close the gap the audit had found.

## Prompt

```text
I own a set of parked domains and some leftover WordPress sites. Two jobs, run them in parallel, and check in with me at each gate.

BOT 1 - DOMAINS
For each domain in <list>:
1. Add the zone to my Cloudflare account, import the existing DNS records, and switch the nameservers at the registrar.
2. Wait until the zone is genuinely active before moving to the next domain. Never batch this blind.
3. Set up email routing so every address on the domain forwards to ONE catch-all inbox: <catch-all address>.
4. Send a real test message to a made-up address on that domain and confirm it arrived. Report delivered / not delivered per domain - do not report "configured" as if it were "working".

BOT 2 - WORDPRESS SITES
For each site in <list>: install and configure the SMTP plugin against <mail provider>, wire up the contact form, then submit the form for real and confirm the message landed in the catch-all inbox.

BOTH
- Keep a running table: domain or site, what changed, test result, what is still broken.
- If your count of what is online disagrees with what is actually running, say so loudly and show me both numbers rather than picking one.

Do the FIRST domain and the FIRST site end to end, show me the result, and get my approval before you touch the rest. Never delete an existing DNS record without showing it to me first.
```

## Why it's cool

This is the boring infrastructure debt everyone has and nobody does: a folder of domains you bought and parked, a couple of old WordPress sites, and mail that may or may not still be arriving. Splitting it across two bots working at the same time is what makes it finish in an afternoon instead of never - one is deep in DNS while the other is deep in SMTP plugins, and neither is waiting on the other. The detail worth stealing is the argument. The bot noticed its own count of what was online did not match reality, refused to smooth it over, and took it up with a CEO bot who then assigned someone to fix it. An agent that surfaces a discrepancy rather than picking whichever number makes the report look finished is the difference between a setup you can trust and a very confident log file.
