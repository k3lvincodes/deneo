import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { WalletProvider } from '@/components/shared/wallet-provider';

export const metadata: Metadata = {
  title: 'DeNeo',
  description: 'Decentralized Farming • Animal Welfare • Circular Income',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-grid-pattern">
        <WalletProvider>
            <Header />
            <main className="flex-grow relative">
            <div className="wave-bg"></div>
            <div className="relative z-10">{children}</div>
            </main>
            <Footer />
            <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}
