export const WEDDING_DATE = new Date('2026-08-29T20:15:00+03:00');

export const HERO_IMAGE = '/images/IMG_3415.jpeg';
export const WEDDING_SCREEN_IMAGE = '/images/IMG_3415.jpeg';

export const EPISODES = [
  {
    num: 1,
    title: 'İlk Tanışma',
    date: '10 Mayıs 2022',
    desc: 'İki hayatın beklenmedik kesiştiği gün.',
    image: '/images/IMG_1862.jpeg',
    progress: 100,
  },
  {
    num: 2,
    title: 'İlk Kahve',
    date: '12 Mayıs 2022',
    desc: 'Basit bir kahve, saatlerce süren sohbete dönüştü.',
    image: '/images/bb75e811-6f01-4688-89f8-eeab487275e8.jpg',
    progress: 100,
  },
  {
    num: 3,
    title: 'Birlikte İlk Adım',
    date: '18 Mayıs 2022',
    desc: 'Aşkımızın başladığı gün.',
    image: '/images/IMG_6224.jpeg',
    progress: 100,
  },
  {
    num: 4,
    title: 'Evlenir misin?',
    date: '14 Mayıs 2024',
    desc: "En güzel 'Evet'.",
    image: '/images/IMG_3397.jpeg',
    progress: 100,
  },
  {
    num: 5,
    title: 'Sözümüz',
    date: '17 Mayıs 2025',
    desc: 'Ailelerimizin buluştuğu özel gün.',
    image: '/images/456FBB30-BDE5-4664-B83B-919D90014806.jpeg',
    progress: 75,
  },
] as const;

export const WEDDING_EVENTS = [
  {
    id: 'henna',
    label: 'KINA GECESİ',
    title: 'Kına Gecesi',
    date: '28 Ağustos',
    venue: 'Salon 16',
    district: 'Bağlarbaşı',
    address: '1. Hürriyet Cd. No:305',
    zip: '16150',
    city: 'Osmangazi / Bursa',
    time: null,
    nikahTime: null,
    mapsUrl: 'https://maps.google.com/?q=Salon+16+Bağlarbaşı+Bursa',
    emoji: '✨',
  },
  {
    id: 'pickup',
    label: 'GELİN ALMA',
    title: 'Gelin Alma',
    date: '29 Ağustos',
    venue: 'Damat Evi',
    district: '',
    address: 'Damat Evinden Başlayacaktır',
    zip: '',
    city: 'Bursa',
    time: '16:00',
    nikahTime: null,
    mapsUrl: null,
    emoji: '🚗',
  },
  {
    id: 'wedding',
    label: 'NİKAH & DÜĞÜN',
    title: 'Nikah & Düğün',
    date: '29 Ağustos',
    venue: 'Atapark Salon Pırlanta',
    district: 'Üçevler',
    address: 'Ahıska Cd. No:36',
    zip: '16120',
    city: 'Nilüfer / Bursa',
    time: '19:00',
    nikahTime: '20:15',
    mapsUrl: 'https://maps.google.com/?q=Atapark+Salon+Pırlanta+Nilüfer+Bursa',
    emoji: '💍',
  },
] as const;

export const PROFILES = [
  { id: 'bride', label: 'Gelin Tarafı', icon: '❤️', color: '#E50914' },
  { id: 'groom', label: 'Damat Tarafı', icon: '🎬', color: '#333' },
  { id: 'family', label: 'Aile', icon: '👨‍👩‍👧', color: '#333' },
  { id: 'friends', label: 'Dostlar', icon: '⭐', color: '#333' },
] as const;

export const NAV_ITEMS = [
  { label: 'Ana Sayfa', href: '#top' },
  { label: 'Hikaye', href: '#episodes' },
  { label: 'Düğün', href: '#finale' },
  { label: 'Etkinlik', href: '#events' },
  { label: 'Galeri', href: '#gallery' },
] as const;

export const GALLERY_IMAGES = [
  '/images/IMG_6251.jpeg',
  '/images/IMG_6091.jpeg',
  '/images/IMG_7730.JPG',
  '/images/IMG_7774.JPG',
  '/images/IMG_6224.jpeg',
  '/images/IMG_3415.jpeg',
] as const;
