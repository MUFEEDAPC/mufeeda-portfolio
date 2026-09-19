import { useState } from 'react';

export default function SafeImage({ src, webp, alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-graphite to-ink text-sm text-muted ${className}`}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  if (webp) {
    return (
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          {...props}
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
