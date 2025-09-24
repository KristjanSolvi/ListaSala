import { notFound } from 'next/navigation';
import { ARTWORKS } from '@/data/artworks';
import { CheckoutView } from '@/components/CheckoutView';

type CheckoutPageProps = {
  params: { artworkId: string };
};

export function generateStaticParams() {
  return ARTWORKS.map(artwork => ({ artworkId: artwork.id }));
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const artwork = ARTWORKS.find(item => item.id === params.artworkId);
  if (!artwork) {
    notFound();
  }
  return <CheckoutView artwork={artwork} />;
}
