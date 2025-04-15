const total = 42
const cardImagesTileDescending: string[] = Array.from({ length: total }, (_, i) => `./assets/images/photos/${total - i}.webp`);

export default cardImagesTileDescending;