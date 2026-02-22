import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getLocale } from 'next-intl/server';
import './globals.css';

const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  description: 'Forest Stewardship Council - Learning Management Dashboard',
  icons: {
    icon: '/FSC-Logo.png',
    apple: '/FSC-Logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
