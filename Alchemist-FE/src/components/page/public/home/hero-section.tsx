import CloudSvg from '@/components/molekule/cloud';
import AlchemistSVG from '@/components/molekule/alchemist';
import Cell from '@/components/molekule/cell';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
      {/* Background Cloud */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none [&>svg]:w-full [&>svg]:h-auto [&>svg]:min-w-[1200px] md:[&>svg]:min-w-full">
        <CloudSvg />
      </div>
      <div className=" absolute inset-0 z-0  flex items-center justify-center ">
        <AlchemistSVG />
      </div>

      <div className="absolute top-0 right-35z-0">
        <Cell />
      </div>
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-5xl mx-auto">
        {/* Retro Header */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-chart-3 font-bold drop-shadow-[2px_2px_0px_#D3CDF4] md:drop-shadow-[4px_4px_0px_#D3CDF4] mb-6 tracking-wider uppercase leading-snug">
          ARCANE Alchemist
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xs md:text-sm lg:text-base text-foreground/80 max-w-2xl leading-loose mb-10 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">
          Virtual Acid-Base Titration Laboratory
        </p>
        <span className="text-lg sm:text-xs md:text-sm lg:text-base text-foreground/80 max-w-2xl leading-loose mb-10 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">
          Lakukan praktikum titrasi asam basa secara virtual, kumpulkan data eksperimen, dan
          analisis hasil reaksi!
        </span>

        {/* Call to Action Button */}
        <button className="px-6 py-3 mb-12 bg-success text-primary-foreground text-xs md:text-sm border-4 border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-primary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1">
          START BREWING
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
