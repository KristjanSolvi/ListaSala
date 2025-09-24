export type Artwork = {
  id: string;
  title: string;
  artist: string;
  priceISK: number;
  medium: string;
  dimensions: string;
  year: number;
  imageUrl: string;
  description: string;
  shipping: string;
};

export const ARTWORKS: Artwork[] = [
  {
    id: 'aurora-01',
    title: 'Aurora Veil',
    artist: 'Elín Sigríður',
    priceISK: 85000,
    medium: 'Oil on canvas',
    dimensions: '60 × 80 cm',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    description: 'Dreamlike aurora curtains inspired by winter nights outside Höfn.',
    shipping: 'Pickup Reykjavik or courier nationwide'
  },
  {
    id: 'geysir-02',
    title: 'Midnight Geysir',
    artist: 'Áki Þór',
    priceISK: 64000,
    medium: 'Acrylic on birch panel',
    dimensions: '50 × 70 cm',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    description: 'Gestural capture of Strokkur erupting beneath a violet sky.',
    shipping: 'Pickup Reykjavik'
  },
  {
    id: 'fjord-03',
    title: 'Fjord Fragments',
    artist: 'Hekla Jónsdóttir',
    priceISK: 42000,
    medium: 'Mixed media collage',
    dimensions: '40 × 40 cm',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1610878180933-0004e4903755?auto=format&fit=crop&w=800&q=80',
    description: 'Layered textures and archival photos cut into angular compositions.',
    shipping: 'Pickup Reykjavik'
  },
  {
    id: 'lagoon-04',
    title: 'Glacier Lagoon',
    artist: 'Jónína Rán',
    priceISK: 98000,
    medium: 'Oil and wax on canvas',
    dimensions: '70 × 90 cm',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    description: 'Thick impasto layers echo the luminous blues of Jökulsárlón.',
    shipping: 'Pickup Reykjavik or courier nationwide'
  },
  {
    id: 'moss-05',
    title: 'Volcanic Moss',
    artist: 'Svala Kristín',
    priceISK: 36000,
    medium: 'Textile tapestry',
    dimensions: '45 × 60 cm',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-dyed sheep wool woven into a relief reminiscent of moss fields.',
    shipping: 'Pickup Reykjavik'
  },
  {
    id: 'harpa-06',
    title: 'Harpa Refracted',
    artist: 'Lára Magnús',
    priceISK: 54000,
    medium: 'Digital print on aluminum',
    dimensions: '55 × 55 cm',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&w=800&q=80',
    description: 'Photographic study of Harpa Concert Hall glass turned kaleidoscope.',
    shipping: 'Pickup Reykjavik or courier nationwide'
  },
  {
    id: 'turf-07',
    title: 'Turf Lineage',
    artist: 'Finnur Páll',
    priceISK: 28000,
    medium: 'Ink on handmade paper',
    dimensions: '30 × 40 cm',
    year: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1542940742-9c3b46168024?auto=format&fit=crop&w=800&q=80',
    description: 'Fine-line drawings referencing turf houses and their geometry.',
    shipping: 'Pickup Reykjavik or mail worldwide'
  },
  {
    id: 'auroras-08',
    title: 'Aurora Study II',
    artist: 'Elín Sigríður',
    priceISK: 78000,
    medium: 'Oil on canvas',
    dimensions: '60 × 70 cm',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    description: 'Sister painting to Aurora Veil, exploring shifting cloud formations.',
    shipping: 'Pickup Reykjavik'
  }
];
