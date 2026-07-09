import React from 'react';

/**
 * Responsive picture element that prefers AVIF, then WebP.
 * The <img src> also points at a modern format so the large JPEG is not used
 * when modern formats are available.
 */
const ResponsiveImage = ({
  avifSrcSet,
  webpSrcSet,
  src,
  alt,
  width,
  height,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  onError,
}) => {
  return (
    <picture>
      {avifSrcSet ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}
      {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
      <img
        src={src}
        srcSet={webpSrcSet || undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        onError={onError}
      />
    </picture>
  );
};

export default ResponsiveImage;
