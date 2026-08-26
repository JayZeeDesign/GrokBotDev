export interface WeightDecisionInput {
  identityAgeSeconds: number;
  firstVoteForIdentity: boolean;
  ip24SlugCastsBefore: number;
  slugRecentCasts10mIncludingThis: number;
  slugTrailingBaseline10m: number;
  asn: number | null;
}

export interface WeightDecision {
  weight: 0 | 1;
  flags: string[];
  signals: Record<string, unknown>;
}

const DATACENTER_ASNS = new Set<number>([
  13335, // Cloudflare
  14618, // AWS
  16509, // AWS
  15169, // Google
  8075,  // Microsoft
  14061, // DigitalOcean
  16276, // OVH
]);

export function decideWeight(input: WeightDecisionInput): WeightDecision {
  const flags: string[] = [];
  const youngIdentity = input.firstVoteForIdentity && input.identityAgeSeconds < 60;
  if (input.ip24SlugCastsBefore >= 2) flags.push('ip24_slug_cluster');
  const velocityFlagged =
    input.slugRecentCasts10mIncludingThis > 15 &&
    input.slugRecentCasts10mIncludingThis > Math.max(input.slugTrailingBaseline10m, 1) * 10;
  if (velocityFlagged) flags.push('velocity');
  if (input.asn != null && DATACENTER_ASNS.has(input.asn)) flags.push('datacenter_asn');

  return {
    weight: flags.length ? 0 : 1,
    flags,
    signals: {
      flags,
      young_identity: youngIdentity,
      identity_age_seconds: Math.max(0, Math.floor(input.identityAgeSeconds)),
      first_vote_for_identity: input.firstVoteForIdentity,
      ip24_slug_casts_before: input.ip24SlugCastsBefore,
      velocity: {
        flagged: velocityFlagged,
        recent_casts_10m_including_this: input.slugRecentCasts10mIncludingThis,
        trailing_baseline_10m: input.slugTrailingBaseline10m,
      },
      asn: input.asn,
    },
  };
}
