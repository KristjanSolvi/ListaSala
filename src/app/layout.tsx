import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Listavefsala — Discover Icelandic Art',
  description:
    'Swipe to discover emerging Icelandic artists and build your personal collection. Save pieces you love and buy directly from creators.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>
            <div className="container">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
