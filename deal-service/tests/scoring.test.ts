import { scoreDeal } from '../src/scoring';

describe('scoreDeal', () => {
  it('returns true when weighted score exceeds threshold', () => {
    expect(scoreDeal({ liquidity: 0.9, covenantStrength: 0.8, sponsorTrack: 0.7 })).toBe(true);
  });

  it('returns false when weighted score below threshold', () => {
    expect(scoreDeal({ liquidity: 0.5, covenantStrength: 0.4, sponsorTrack: 0.3 })).toBe(false);
  });

  it('honors override', () => {
    expect(scoreDeal({ liquidity: 0.1, covenantStrength: 0.1, sponsorTrack: 0.1, override: true })).toBe(true);
  });
});
