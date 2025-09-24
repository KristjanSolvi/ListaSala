'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useOrders } from '@/context/orders-context';
import { formatISK } from '@/utils/format';

export function OrderDetails({ orderId }: { orderId: string }) {
  const { getOrder } = useOrders();
  const order = useMemo(() => getOrder(orderId), [getOrder, orderId]);

  if (!order) {
    return (
      <section style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>We couldn&apos;t find that order</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          If you cleared your browser storage the confirmation may have been removed. Go back to discover more art.
        </p>
        <Link href="/" className="primary-btn">
          Back to deck
        </Link>
      </section>
    );
  }

  return (
    <section style={{ display: 'grid', gap: '2rem' }}>
      <header style={{ display: 'grid', gap: '0.5rem', textAlign: 'center', paddingTop: '1rem' }}>
        <p style={{ margin: 0, color: 'var(--primary)', letterSpacing: '0.08em' }}>Order confirmed</p>
        <h1 style={{ margin: 0, fontSize: '2.6rem' }}>Takk fyrir!</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>You&apos;ll hear from the artist shortly to coordinate details.</p>
      </header>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
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
            gap: '0.85rem'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Artwork</h2>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '115%', borderRadius: '16px', overflow: 'hidden' }}>
            <Image
              src={order.artwork.imageUrl}
              alt={order.artwork.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <strong>{order.artwork.title}</strong>
            <span style={{ color: 'var(--text-muted)' }}>{order.artwork.artist}</span>
            <span style={{ fontWeight: 600 }}>{formatISK(order.artwork.priceISK)}</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{order.artwork.medium}</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{order.artwork.dimensions}</span>
          </div>
        </article>

        <div
          style={{
            background: 'var(--surface)',
            borderRadius: '22px',
            padding: '1.5rem',
            boxShadow: '0 18px 32px rgba(15, 23, 42, 0.12)',
            display: 'grid',
            gap: '1rem'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Order details</h2>
          <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.95rem' }}>
            <span><strong>Order ID:</strong> {order.id}</span>
            <span>
              <strong>Placed:</strong> {new Date(order.createdAt).toLocaleString('is-IS', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
            <span><strong>Buyer:</strong> {order.buyer.name}</span>
            <span><strong>Email:</strong> {order.buyer.email}</span>
            <span><strong>Phone:</strong> {order.buyer.phone}</span>
            <span><strong>Shipping:</strong> {order.shippingOption}</span>
          </div>
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.04)', borderRadius: '16px', padding: '1rem 1.2rem', display: 'grid', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span>Artwork</span>
              <span>{formatISK(order.artwork.priceISK)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span>Shipping</span>
              <span>{formatISK(order.totalISK - order.artwork.priceISK)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.05rem' }}>
              <span>Total</span>
              <span>{formatISK(order.totalISK)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/collection" className="primary-btn">
          View saved collection
        </Link>
      </div>
    </section>
  );
}
