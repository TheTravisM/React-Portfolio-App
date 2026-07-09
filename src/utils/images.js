/**
 * Helpers for responsive modern image sources.
 */

export function buildSrcSet(entries = []) {
  return entries
    .filter((entry) => entry?.src && entry?.width)
    .map((entry) => `${entry.src} ${entry.width}w`)
    .join(', ');
}

export function portfolioImageSet(baseName, widths = [480, 768, 1024]) {
  return {
    width: 1024,
    height: 768,
    sizes: '(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 560px',
    avifSrcSet: buildSrcSet(
      widths.map((width) => ({
        src: `/img/avif/${baseName}-${width}.avif`,
        width,
      })),
    ),
    webpSrcSet: buildSrcSet(
      widths.map((width) => ({
        src: `/img/webp/${baseName}-${width}.webp`,
        width,
      })),
    ),
    // Prefer modern formats; keep a small compressed JPEG only as last-resort fallback.
    fallbackSrc: `/img/webp/${baseName}-${widths[widths.length - 1]}.webp`,
    jpgSrcSet: buildSrcSet(
      widths.map((width) => ({
        src: `/img/${baseName}-${width}.jpg`,
        width,
      })),
    ),
  };
}

export const HERO_IMAGE = {
  width: 590,
  height: 1008,
  sizes: '(max-width: 767px) 90vw, 400px',
  avifSrcSet: buildSrcSet([
    { src: '/img/avif/ProfilePic-320.avif', width: 320 },
    { src: '/img/avif/ProfilePic-480.avif', width: 480 },
    { src: '/img/avif/ProfilePic-590.avif', width: 590 },
  ]),
  webpSrcSet: buildSrcSet([
    { src: '/img/webp/ProfilePic-320.webp', width: 320 },
    { src: '/img/webp/ProfilePic-480.webp', width: 480 },
    { src: '/img/webp/ProfilePic-590.webp', width: 590 },
  ]),
  // Use WebP as the <img src> fallback so browsers that support WebP but not
  // <picture> still avoid the large JPEG. True legacy browsers without WebP
  // support are rare; AVIF/WebP sources cover modern browsers.
  fallbackSrc: '/img/webp/ProfilePic-590.webp',
};
