'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter();
  const { user, signIn } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setPhone(user.phone ?? '');
    }
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !name.trim()) {
      setError('Name and email are required.');
      return;
    }

    signIn({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    router.push('/collection');
  };

  const oppositeMode = mode === 'sign-in' ? 'sign-up' : 'sign-in';

  return (
    <section style={{ display: 'grid', gap: '1.5rem', maxWidth: '420px', margin: '0 auto', paddingTop: '2rem' }}>
      <header style={{ textAlign: 'center', display: 'grid', gap: '0.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '2.3rem' }}>{mode === 'sign-in' ? 'Welcome back' : 'Join Listavefsala'}</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          {mode === 'sign-in'
            ? 'Sign in to sync your saved pieces across devices.'
            : 'Create a lightweight account to keep your collection everywhere.'}
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--surface)',
          borderRadius: '20px',
          padding: '1.75rem',
          boxShadow: '0 18px 32px rgba(15, 23, 42, 0.12)',
          display: 'grid',
          gap: '1rem'
        }}
      >
        <div>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={name} onChange={event => setName(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" value={phone} onChange={event => setPhone(event.target.value)} placeholder="+354 555 1234" />
        </div>

        {error && <p style={{ color: '#b91c1c', margin: 0 }}>{error}</p>}

        <button type="submit" className="primary-btn">
          {mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        {mode === 'sign-in' ? "Don't have an account?" : 'Already with us?'}{' '}
        <Link href={`/auth/${oppositeMode}`} style={{ fontWeight: 600 }}>
          {mode === 'sign-in' ? 'Create one' : 'Sign in'}
        </Link>
      </p>
    </section>
  );
}
