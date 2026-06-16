import Link from 'next/link';
import AlchemistSVGNoBg from '@/components/molekule/alchemist-no-bg';

const MenuSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <AlchemistSVGNoBg />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-sm mx-auto w-full gap-5">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-chart-3 font-bold drop-shadow-[2px_2px_0px_#D3CDF4] md:drop-shadow-[4px_4px_0px_#D3CDF4] mb-8 tracking-wider uppercase leading-snug">
          ALCHEMIST
        </h1>

        {/* Menu Buttons */}
      <Link 
  href="/materi" 
  className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center"
>
  Start Lab
</Link>
        <Link href="/praktikum" className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center">
          Module
        </Link>

        <Link href="/kuis" className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center">
          Kuis
        </Link>
        
        <Link href="/petunjuk" className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center">
          Petunjuk
        </Link>

        <Link href="/" className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center">
          Kembali
        </Link>
      </div>
    </section>
  );
};

export default MenuSection;
