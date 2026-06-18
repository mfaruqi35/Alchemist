import Image from 'next/image';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="relative w-full bg-[#35265b] py-16 md:py-24 overflow-hidden ">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Left Side: Character */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="relative w-48 h-48 md:w-[280px] md:h-[280px] animate-float">
              <Image
                src="/images/char-1.webp"
                alt="Scientist Cheering"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Right Side: CTA Frame */}
          <div className="w-full md:w-2/3 relative flex items-center justify-center p-4">
            {/* Content Container with Border Image Background */}
            <div className="relative w-full max-w-3xl flex flex-col items-center justify-center text-center px-10 py-16 sm:p-20">
              {/* Background Border */}
              <div className="absolute inset-0 w-full h-full -z-10">
                <Image
                  src="/images/border.webp"
                  alt="Retro Frame"
                  fill
                  className="object-fill sm:object-contain drop-shadow-2xl"
                />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] xl:text-[32px] font-bold text-white uppercase tracking-wider mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)] leading-[1.4]">
                MULAI EKSPERIMEN <br className="hidden sm:block" />
                VIRTUALMU SEKARANG
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-sans mb-10 max-w-lg drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)] tracking-wide leading-relaxed">
                Ayo mulai eksperimen, kumpulkan data, dan analisis hasil reaksinya.
              </p>

              <Link
                href="/menu"
                className="inline-block px-8 py-4 bg-success text-white text-xs md:text-sm font-bold border-4 border-[#3D6B0B] hover:bg-[#68B014] hover:border-[#4B850E] transition-all duration-200 active:translate-y-1 active:translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.6)] tracking-wide uppercase"
              >
                START EXPERIMENT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
