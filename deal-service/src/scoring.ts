export interface ScoreFactors {
  liquidity: number;
  covenantStrength: number;
  sponsorTrack: number;
  override?: boolean;
}

export function scoreDeal(factors: ScoreFactors): boolean {
  if (factors.override) return true;
  const weight = factors.liquidity * 0.4 + factors.covenantStrength * 0.35 + factors.sponsorTrack * 0.25;
  return weight >= 0.7;
}
