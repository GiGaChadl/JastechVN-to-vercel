import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jastech | Vietnam Software Development Partner for Japanese Companies',
    template: '%s | Jastech',
  },
  description:
    'Jastech is a trusted software development partner in Vietnam for Japanese companies. We provide web development, application development, and maintenance services with transparent communication.',
  keywords: [
    'software development Vietnam',
    'Japanese company partner',
    'offshore development',
    'web development',
    'application development',
    'Vietnam IT partner',
  ],
  authors: [{ name: 'Jastech' }],
  creator: 'Jastech',
  publisher: 'Jastech',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
