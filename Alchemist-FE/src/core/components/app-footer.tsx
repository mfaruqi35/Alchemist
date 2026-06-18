import { FlaskConical } from 'lucide-react';
import Link from 'next/link';

export default function AppFooter() {
  return (
    <footer className="w-full bg-[#2A1E4A] py-6 border-t border-[#D3CDF4]/10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand / Logo Area */}
          <div className="flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-white font-bold tracking-widest text-sm md:text-base">
              ALCHEMIST
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/faq"
              className="text-white/80 hover:text-white text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-200"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-200"
            >
              KONTAK
            </Link>
            <Link
              href="/privacy-policy"
              className="text-white/80 hover:text-white text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-200"
            >
              KEBIJAKAN PRIVASI
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
