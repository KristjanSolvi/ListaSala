'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Link from 'next/link';
import { ARTWORKS } from '@/data/artworks';
import { ArtworkCard } from '@/components/ArtworkCard';
import { useSavedArt } from '@/context/saved-art-context';

export function SwipeDeck() {
  const { savedIds, dismissedIds, saveArtwork, dismissArtwork, resetDeck } = useSavedArt();
  const [feedback, setFeedback] = useState<{ id: string; direction: 'left' | 'right' } | null>(null);

  const queue = useMemo(() => {
    return ARTWORKS.filter(artwork => !savedIds.includes(artwork.id) && !dismissedIds.includes(artwork.id));
  }, [savedIds, dismissedIds]);

  const currentArtwork = queue[0];

  const handleDecision = useCallback(
    (direction: 'left' | 'right') => {
      if (!currentArtwork) return;
      setFeedback({ id: currentArtwork.id, direction });

      if (direction === 'right') {
        saveArtwork(currentArtwork.id);
      } else {
        dismissArtwork(currentArtwork.id);
      }

      setTimeout(() => setFeedback(null), 240);
    },
    [currentArtwork, dismissArtwork, saveArtwork]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleDecision('left'),
    onSwipedRight: () => handleDecision('right'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!currentArtwork) return;
      if (event.key === 'ArrowLeft') {
        handleDecision('left');
      }
      if (event.key === 'ArrowRight') {
        handleDecision('right');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [currentArtwork, handleDecision]);

  if (!currentArtwork) {
    const remainingSaved = savedIds.length;
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '2.6rem', marginBottom: '0.75rem' }}>You&apos;re all caught up</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {remainingSaved
            ? 'Head over to your saved collection to see the works you loved.'
            : 'No more new pieces right now. Reset the deck to revisit the artworks.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/collection" className="primary-btn">
            Check Saved
          </Link>
          <button className="secondary-btn" onClick={resetDeck}>
            Reset Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      style={{
        display: 'grid',
        gap: '1.75rem',
        justifyItems: 'center'
      }}
    >
      {feedback && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            backgroundColor:
              feedback.direction === 'right' ? 'rgba(11, 114, 133, 0.12)' : 'rgba(220, 38, 38, 0.12)',
            color: feedback.direction === 'right' ? 'var(--primary)' : '#b91c1c',
            fontWeight: 600,
            width: 'fit-content'
          }}
        >
          {feedback.direction === 'right' ? 'Saved to your collection' : 'Dismissed'}
        </div>
      )}

      <div
        {...swipeHandlers}
        style={{
          userSelect: 'none',
          touchAction: 'pan-y',
          width: '100%',
          maxWidth: '560px'
        }}
      >
        <ArtworkCard
          artwork={currentArtwork}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="secondary-btn"
                style={{ minWidth: '140px', backgroundColor: feedback?.direction === 'left' ? 'rgba(220, 38, 38, 0.12)' : undefined }}
                onClick={() => handleDecision('left')}
              >
                Dismiss
              </button>
              <button
                className="primary-btn"
                style={{ minWidth: '180px', boxShadow: feedback?.direction === 'right' ? '0 0 0 4px rgba(11, 114, 133, 0.25)' : undefined }}
                onClick={() => handleDecision('right')}
              >
                Save it
              </button>
            </div>
          }
        />
      </div>

      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
        {queue.length} piece{queue.length === 1 ? '' : 's'} waiting — use arrow keys or swipe.
      </span>
    </section>
  );
}
