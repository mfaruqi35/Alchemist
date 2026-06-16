import { metadata, siteConfig } from './metadata';
import '@/styles/globals.css';
import { AppProviders } from './providers';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
});

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body className={pressStart2P.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
