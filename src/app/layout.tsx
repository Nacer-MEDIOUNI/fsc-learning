import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FSC Learning Dashboard',
  description: 'Your learning journey starts here',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
