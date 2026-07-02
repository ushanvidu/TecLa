// Baked-in brand tokens (equivalent to the Claude Design "Tweaks panel" defaults:
// accentColor #16A34A, heroShape icosahedron, motion balanced, showMarquee true).
export const theme = {
  bg: '#05090B',
  text: '#E8F2EC',
  accent: '#16A34A',
  accentLight: '#57BD7D',
  accentDeep: '#0D5F2B',
  heroShape: 'icosahedron' as const,
  motion: 1, // balanced multiplier (calm = 0.5, lively = 1.7)
  showMarquee: true,
};
