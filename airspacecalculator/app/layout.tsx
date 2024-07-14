import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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