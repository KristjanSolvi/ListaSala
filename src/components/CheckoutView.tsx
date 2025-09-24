'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Artwork } from '@/data/artworks';
import { formatISK } from '@/utils/format';
import { useAuth } from '@/context/auth-context';
import { useOrders } from '@/context/orders-context';
import { useSavedArt } from '@/context/saved-art-context';

const SHIPPING_OPTIONS = [
  { id: 'pickup', label: 'Pickup Reykjavik (free)', price: 0 },
  { id: 'courier', label: 'Domestic courier (+4.500 ISK)', price: 4500 }
] as const;

export function CheckoutView({ artwork }: { artwork: Artwork }) {
  const router = useRouter();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { removeSaved } = useSavedArt();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingId, setShippingId] = useState<(typeof SHIPPING_OPTIONS)[number]['id']>('pickup');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setPhone(user.phone ?? '');
    }
  }, [user]);

  const shippingSelection = useMemo(
    () => SHIPPING_OPTIONS.find(option => option.id === shippingId) ?? SHIPPING_OPTIONS[0],
    [shippingId]
  );

  const total = artwork.priceISK + shippingSelection.price;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in name, email, and phone so the artist can reach you.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const order = createOrder({
      artwork,
      buyer: { name: name.trim(), email: email.trim(), phone: phone.trim() },
      shippingOption: shippingSelection.label,
      totalISK: total
    });

    removeSaved(artwork.id);
    router.replace(`/order/${order.id}`);
  };

  return (
    <section style={{ display: 'grid', gap: '2rem', alignItems: 'flex-start' }}>
      <header style={{ display: 'grid', gap: '0.4rem' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Checkout</p>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Confirm your order</h1>
      </header>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
        }}
      >
        <article
          style={{
            background: 'var(--surface)',
            borderRadius: '22px',
            padding: '1.5rem',
            boxShadow: '0 18px 32px rgba(15, 23, 42, 0.12)',
            display: 'grid',
            gap: '1rem'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Artwork</h2>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '110%', borderRadius: '16px', overflow: 'hidden' }}>
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <strong>{artwork.title}</strong>
            <span style={{ color: 'var(--text-muted)' }}>{artwork.artist}</span>
            <span style={{ fontWeight: 600 }}>{formatISK(artwork.priceISK)}</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{artwork.medium}</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{artwork.dimensions}</span>
          </div>
        </article>

        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--surface)',
            borderRadius: '22px',
            padding: '1.75rem',
            boxShadow: '0 18px 32px rgba(15, 23, 42, 0.12)'
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
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={phone} onChange={event => setPhone(event.target.value)} required />
          </div>

          <div>
            <label htmlFor="shipping">Shipping</label>
            <select id="shipping" name="shipping" value={shippingId} onChange={event => setShippingId(event.target.value as typeof shippingId)}>
              {SHIPPING_OPTIONS.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.04)', borderRadius: '16px', padding: '1rem 1.2rem', display: 'grid', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span>Artwork</span>
              <span>{formatISK(artwork.priceISK)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span>Shipping</span>
              <span>{formatISK(shippingSelection.price)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.05rem' }}>
              <span>Total</span>
              <span>{formatISK(total)}</span>
            </div>
          </div>

          {error && <p style={{ color: '#b91c1c', margin: 0 }}>{error}</p>}

          <button type="submit" className="primary-btn" disabled={isSubmitting} style={{ marginTop: '0.5rem' }}>
            {isSubmitting ? 'Placing order…' : 'Confirm order'}
          </button>
        </form>
      </div>
    </section>
  );
}
