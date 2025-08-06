export function getColorFromString(str) {
  const COLORS = [
    "gray",
    "red",
    "green",
    "blue",
    "teal",
    "pink",
    "purple",
    "cyan",
    "orange",
    "yellow",
  ];

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}
