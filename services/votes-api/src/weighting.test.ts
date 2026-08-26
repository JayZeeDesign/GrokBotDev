import { decideWeight } from './weighting.js';

describe('shadow weighting', () => {
  const base = {
    identityAgeSeconds: 120,
    firstVoteForIdentity: false,
    ip24SlugCastsBefore: 0,
    slugRecentCasts10mIncludingThis: 1,
    slugTrailingBaseline10m: 1,
    asn: null,
  };

  it('allows ordinary casts', () => {
    expect(decideWeight(base).weight).toBe(1);
  });

  it('discounts identities younger than 60 seconds on first vote', () => {
    const d = decideWeight({ ...base, firstVoteForIdentity: true, identityAgeSeconds: 12 });
    expect(d.weight).toBe(0);
    expect(d.flags).toContain('new_identity');
  });

  it('discounts the third cast on a slug from the same /24', () => {
    const d = decideWeight({ ...base, ip24SlugCastsBefore: 2 });
    expect(d.weight).toBe(0);
    expect(d.flags).toContain('ip24_slug_cluster');
  });

  it('flags velocity bursts above baseline', () => {
    const d = decideWeight({ ...base, slugRecentCasts10mIncludingThis: 16, slugTrailingBaseline10m: 1 });
    expect(d.weight).toBe(0);
    expect(d.flags).toContain('velocity');
  });
});
