import Link from 'next/link';

import AlchemistSVGNoBg from '@/components/molekule/alchemist-no-bg';

const MateriSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <AlchemistSVGNoBg />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-2xl mx-auto w-full gap-8">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-chart-3 font-bold drop-shadow-[2px_2px_0px_#D3CDF4] md:drop-shadow-[4px_4px_0px_#D3CDF4] mb-4 tracking-wider uppercase leading-snug">
          DIAGNOSTIC TEST
        </h1>

        <div className="bg-[#FDF8F5] border-4 border-secondary p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(26,42,122,1)] w-full max-w-lg mx-auto flex flex-col items-center gap-6">
          <p className="text-sm md:text-base font-semibold text-secondary-foreground leading-relaxed text-left w-full">
            Sebelum memulai praktikum, Anda harus menyelesaikan tes diagnostik terlebih dahulu untuk
            mengukur pemahaman awal Anda tentang materi Titrasi Asam Basa.
          </p>

          <div className="flex flex-col gap-3 text-xs md:text-sm text-left w-full bg-white p-6 border-4 border-secondary shadow-[4px_4px_0px_0px_rgba(26,42,122,1)]">
            <div className="flex justify-between items-center border-b-2 border-dashed border-secondary pb-2">
              <span className="font-bold text-secondary-foreground">Materi:</span>
              <span className="text-right font-medium">Titrasi Asam Basa</span>
            </div>
            <div className="flex justify-between items-center border-b-2 border-dashed border-secondary pb-2">
              <span className="font-bold text-secondary-foreground">Jumlah Soal:</span>
              <span className="text-right font-medium">5 Pilihan Ganda</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-secondary-foreground">Waktu:</span>
              <span className="text-right font-medium">15 Menit</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 mt-6">
            <Link
              href="/materi/test"
              className="w-full px-6 py-4 bg-secondary text-secondary-foreground text-sm md:text-lg border-4 border-primary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center "
            >
              START TEST
            </Link>

            <Link
              href="/menu"
              className="w-full px-6 py-4 bg-destructive text-primary-foreground text-sm md:text-lg border-4 border-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-primary transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest text-center"
            >
              KEMBALI
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MateriSection;
