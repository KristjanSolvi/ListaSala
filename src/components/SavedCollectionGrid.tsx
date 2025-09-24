'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { ARTWORKS } from '@/data/artworks';
import { useSavedArt } from '@/context/saved-art-context';
import { formatISK } from '@/utils/format';

export function SavedCollectionGrid() {
  const { savedIds, removeSaved } = useSavedArt();

  const artworks = useMemo(
    () =>
      savedIds
        .map(id => ARTWORKS.find(artwork => artwork.id === id))
        .filter((artwork): artwork is (typeof ARTWORKS)[number] => Boolean(artwork)),
    [savedIds]
  );

  if (!artworks.length) {
    return (
      <section style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>Nothing saved yet</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Swipe right on the pieces you vibe with. They&apos;ll collect here like a mood board of what you love.
        </p>
        <Link href="/" className="primary-btn">
          Back to the deck
        </Link>
      </section>
    );
  }

  return (
    <section style={{ display: 'grid', gap: '2rem' }}>
      <header style={{ display: 'grid', gap: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Your saved pieces — curated by your swipes
        </p>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Collection ({artworks.length})</h1>
      </header>

      <div
        style={{
          display: 'grid',
          gap: '1.75rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
        }}
      >
        {artworks.map(artwork => (
          <div
            key={artwork.id}
            style={{
              position: 'relative',
              background: 'var(--surface)',
              borderRadius: '22px',
              padding: '1.1rem',
              boxShadow: '0 18px 32px rgba(15, 23, 42, 0.12)',
              display: 'grid',
              gap: '0.85rem'
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '120%', borderRadius: '16px', overflow: 'hidden' }}>
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <strong>{artwork.title}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{artwork.artist}</span>
              <span style={{ fontWeight: 600 }}>{formatISK(artwork.priceISK)}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link href={`/checkout/${artwork.id}`} className="primary-btn" style={{ padding: '0.55rem 1.1rem', flex: 1, textAlign: 'center' }}>
                Buy now
              </Link>
              <button
                className="secondary-btn"
                style={{ padding: '0.55rem 1rem', flex: '0 0 auto' }}
                onClick={() => removeSaved(artwork.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
