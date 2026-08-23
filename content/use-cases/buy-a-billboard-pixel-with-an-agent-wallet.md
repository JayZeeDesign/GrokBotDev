---
type: use-case
name: "Molty · Agent Buyer"
slug: buy-a-billboard-pixel-with-an-agent-wallet
headline: "An agent bought a billboard pixel for $1.01, no checkout"
summary: "Majilesh asked Grok Bot to buy ad space on moltbillboard.com. It registered itself as an agent called molty, got a quote for a pixel, and paid $1.01 out of a Base USDC wallet over x402. No Stripe form, no human checkout, and the pixel is publicly verifiable."
categories: [engineering, fun]
format: use-case
tagline: "An agent wallet, an x402 quote, and a permanent green pixel at 12,12."
category: engineering
subcategory: agents-ops
bot_name: "Molty"
what_it_does: "Grok Bot registers itself as an agent on a machine-payable site, requests a price, and settles it from its own Base USDC wallet over x402. Majilesh topped the wallet with about $2, the bot paid $1.01, and it left a permanent green pixel at (12,12)."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 45
source_tweets:
  - url: https://x.com/majilesh/status/2091319480853160437
    author_handle: majilesh
    excerpt: "I asked Grok Bot to buy ad space on moltbillboard.com. It registered as an agent (molty), quoted a pixel, and used a Base USDC wallet. I topped up ~$2 USDC, it paid $1.01 via x402. No Stripe form. No human checkout."
    posted_at: "2026-08-23T00:19:53Z"
author:
  handle: majilesh
  url: https://x.com/majilesh
  platform: x
prompt_provenance: curator
replicability: "Majilesh described the run rather than posting a prompt, so the starter below is a curator distillation. To adapt: fund a wallet with a deliberately small float, set a hard per-purchase cap, and demand the public verification URL back as proof rather than a success message."
awesome_score: 85
score_breakdown:
  reproducibility: 16
  ambition: 17
  concreteness: 18
  novelty: 15
  evidence: 10
  craft: 9
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Give Grok Bot a wallet of its own and a small float.** Majilesh funded a Base USDC wallet with roughly $2, which is the right order of magnitude for a first run: enough to complete a real purchase, small enough that a bug is not an incident.
2. **Point it at a merchant that speaks the machine-payment protocol.** moltbillboard.com sells single pixels and accepts x402, so the whole transaction can happen without a checkout page.
3. **Have it register as an agent first.** It signed up under its own identifier, molty, so the purchase is attributed to the agent rather than to a person borrowing a card.
4. **Ask for a quote before anything moves.** It requested the price for a specific pixel and reported back.
5. **Approve, then let it settle.** It paid $1.01 in USDC over x402 - no Stripe form, no human checkout, no card details anywhere in the loop.
6. **Take the receipt as a URL, not a claim.** The result is a permanent green pixel at (12,12), with a public agent page and a public API record that anyone can check.
7. **Verify it yourself.** The billboard's own API confirms the pixel at 12,12: colour #22c55e, price 1.01, owner molty, purchased on 2026-08-22.

## Prompt

```text
I want you to buy ad space on <machine-payable site> using your own wallet. This spends real money, so follow these steps exactly.

1. REGISTER as an agent on the site under your own identifier. Tell me the identifier and the agent page URL you get back.
2. QUOTE. Ask for the price of <the specific unit you want - e.g. the pixel at coordinates (x,y)>. Report the exact amount, the currency, the chain and the payment protocol before you go any further.
3. CHECK THE FLOAT. Report your wallet balance and confirm the quote is inside these limits:
   - hard cap per purchase: <amount>
   - hard cap per day: <amount>
   If the quote is above either cap, STOP and tell me.
4. STOP HERE. Show me the quote, the balance, and exactly what you are about to buy, and wait for me to say go. Never settle a payment without that approval.
5. On my go, settle the payment and place the purchase.
6. PROOF, not a summary. Come back with the public URL that shows the purchase, and an API or explorer link a stranger could check without trusting either of us. If you cannot produce a verifiable link, treat the run as failed and say so.

Never move funds anywhere other than this purchase, and never top your own wallet up.
```

## Why it's cool

This is the smallest possible complete example of something genuinely new: an agent with its own identity and its own wallet completing a real commercial transaction with no human at the checkout. The transaction is trivial - one pixel, a dollar and one cent - and that is exactly why it is a good demonstration. Every part of the loop that usually assumes a person is present has been removed: no card form, no Stripe redirect, no click-to-confirm. The bot registers as itself, asks a price, and settles over x402 from a Base USDC wallet. The part that makes it worth listing rather than just claiming is the receipt: Majilesh published both an agent page and an API endpoint, and the pixel at 12,12 really is there, green, priced at 1.01, owned by molty. Most agent-commerce posts ask you to take their word for it. This one hands you the URL and lets you check.
