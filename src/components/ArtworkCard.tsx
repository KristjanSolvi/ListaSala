'use client';

import Image from 'next/image';
import { Artwork } from '@/data/artworks';
import { formatISK } from '@/utils/format';
import type { CSSProperties, ReactNode } from 'react';

const cardContainerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '540px',
  margin: '0 auto',
  borderRadius: '26px',
  overflow: 'hidden',
  background: 'var(--surface)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1.25rem 1.5rem 1.75rem',
  boxShadow: '0 25px 45px rgba(15, 23, 42, 0.18)'
};

const imageWrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '130%',
  borderRadius: '18px',
  overflow: 'hidden'
};

const infoGridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.5rem'
};

export function ArtworkCard({ artwork, footer }: { artwork: Artwork; footer?: ReactNode }) {
  return (
    <article style={cardContainerStyle} className="card-shadow">
      <div style={imageWrapperStyle}>
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 540px"
          style={{ objectFit: 'cover', filter: 'saturate(105%)', transform: 'scale(1.02)' }}
        />
      </div>

      <div style={infoGridStyle}>
        <div>
          <span className="tag">{artwork.medium}</span>
        </div>
        <h2 style={{ margin: 0, fontSize: '1.9rem', lineHeight: 1.1 }}>{artwork.title}</h2>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontWeight: 500 }}>{artwork.artist}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{formatISK(artwork.priceISK)}</p>
        <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '0.35rem 1.25rem', margin: 0 }}>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Size</dt>
          <dd style={{ margin: 0 }}>{artwork.dimensions}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Year</dt>
          <dd style={{ margin: 0 }}>{artwork.year}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Shipping</dt>
          <dd style={{ margin: 0 }}>{artwork.shipping}</dd>
        </dl>
        <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.5 }}>{artwork.description}</p>
      </div>

      {footer}
    </article>
  );
}
