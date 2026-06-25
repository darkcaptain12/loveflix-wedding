import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Emir & Elif — 29 Ağustos 2025',
  description: 'Emir & Elif düğününe davetlisiniz. 29 Ağustos 2025, Bursa.',
  keywords: ['düğün', 'davetiye', 'Emir', 'Elif', 'wedding'],
  openGraph: {
    title: 'Emir & Elif — Our Love Story',
    description: 'Emir & Elif düğününe davetlisiniz. 29 Ağustos 2025.',
    type: 'website',
    locale: 'tr_TR',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
