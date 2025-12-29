import type { Metadata } from 'next';
import { Inter, Dancing_Script, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Thindi Potha - Fresh Meals Delivered',
  description: 'Order delicious meals from our cloud kitchen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} ${poppins.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}

