'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useAuth } from '@/context/auth-context';
import { useSavedArt } from '@/context/saved-art-context';

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const className = isActive ? 'active' : undefined;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const { user, signOut } = useAuth();
  const { savedIds } = useSavedArt();
  const savedCount = savedIds.length;

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          Listavefsala
        </Link>
        <div className="nav-links">
          <NavLink href="/">Discover</NavLink>
          <NavLink href="/collection">
            Saved{savedCount ? ` (${savedCount})` : ''}
          </NavLink>
          {user ? (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hi, {user.name.split(' ')[0] ?? 'there'}</span>
              <button onClick={signOut}>Sign out</button>
            </>
          ) : (
            <NavLink href="/auth/sign-in">Sign in</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
