'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { readStorage, writeStorage } from '@/utils/storage';

const SAVED_LOCAL_KEY = 'lv-saved-local';

export type SavedState = {
  savedIds: string[];
  dismissedIds: string[];
};

const defaultState: SavedState = {
  savedIds: [],
  dismissedIds: []
};

type SavedArtContextValue = {
  savedIds: string[];
  dismissedIds: string[];
  isSaved: (id: string) => boolean;
  isDismissed: (id: string) => boolean;
  saveArtwork: (id: string) => void;
  dismissArtwork: (id: string) => void;
  removeSaved: (id: string) => void;
  resetDeck: () => void;
};

const SavedArtContext = createContext<SavedArtContextValue | undefined>(undefined);

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids));
}

export function SavedArtProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<SavedState>(defaultState);

  const storageKey = useMemo(() => (user ? `lv-saved-${user.email}` : SAVED_LOCAL_KEY), [user]);

  // When a user signs in, migrate any locally stored saved/dismissed items.
  useEffect(() => {
    if (!user) return;
    const localState = readStorage<SavedState>(SAVED_LOCAL_KEY, defaultState);
    if (!localState.savedIds.length && !localState.dismissedIds.length) {
      return;
    }

    const userKey = `lv-saved-${user.email}`;
    const existing = readStorage<SavedState>(userKey, defaultState);
    const merged: SavedState = {
      savedIds: uniqueIds([...existing.savedIds, ...localState.savedIds]),
      dismissedIds: uniqueIds([...existing.dismissedIds, ...localState.dismissedIds])
    };

    writeStorage(userKey, merged);
    writeStorage(SAVED_LOCAL_KEY, defaultState);
    setState(merged);
  }, [user]);

  // Load state for current storage scope (local or user-specific).
  useEffect(() => {
    const stored = readStorage<SavedState>(storageKey, defaultState);
    setState(stored);
  }, [storageKey]);

  const persist = useCallback(
    (updater: (prev: SavedState) => SavedState) => {
      setState(prev => {
        const next = updater(prev);
        writeStorage(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );

  const saveArtwork = useCallback(
    (id: string) => {
      persist(prev => ({
        savedIds: uniqueIds([id, ...prev.savedIds]),
        dismissedIds: prev.dismissedIds.filter(existingId => existingId !== id)
      }));
    },
    [persist]
  );

  const dismissArtwork = useCallback(
    (id: string) => {
      persist(prev => ({
        savedIds: prev.savedIds.filter(existingId => existingId !== id),
        dismissedIds: uniqueIds([id, ...prev.dismissedIds])
      }));
    },
    [persist]
  );

  const removeSaved = useCallback(
    (id: string) => {
      persist(prev => ({
        savedIds: prev.savedIds.filter(existingId => existingId !== id),
        dismissedIds: prev.dismissedIds
      }));
    },
    [persist]
  );

  const resetDeck = useCallback(() => {
    persist(prev => ({
      savedIds: prev.savedIds,
      dismissedIds: []
    }));
  }, [persist]);

  const value = useMemo(() => {
    const { savedIds, dismissedIds } = state;
    return {
      savedIds,
      dismissedIds,
      isSaved: (id: string) => savedIds.includes(id),
      isDismissed: (id: string) => dismissedIds.includes(id),
      saveArtwork,
      dismissArtwork,
      removeSaved,
      resetDeck
    } satisfies SavedArtContextValue;
  }, [state, saveArtwork, dismissArtwork, removeSaved, resetDeck]);

  return <SavedArtContext.Provider value={value}>{children}</SavedArtContext.Provider>;
}

export function useSavedArt() {
  const ctx = useContext(SavedArtContext);
  if (!ctx) {
    throw new Error('useSavedArt must be used within <SavedArtProvider>');
  }
  return ctx;
}
