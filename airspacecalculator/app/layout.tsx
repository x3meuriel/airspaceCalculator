import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';
import logo from '../public/background.svg';

const campton = localFont({
  variable: '--font-campton',
  src: [
    {
      path: './fonts/campton/CamptonBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/campton/CamptonMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/campton/CamptonLight.otf',
      weight: '300',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Airspace calculator',
  description:
    'Airspace calculator for getting an estimate for airspace cost on a location',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={campton.variable}>{children}</body>
    </html>
  );
}
