import { Beaker, CheckCircle2, FileText, PenTool, Search } from 'lucide-react';

import Sheet from '@/components/molekule/sheet';

const flowSteps = [
  {
    id: 1,
    title: 'Pilih Modul',
    description: 'Pilih modul praktikum titrasi asam-basa yang tersedia.',
    icon: Search,
  },
  {
    id: 2,
    title: 'Persiapan',
    description: 'Siapkan alat dan bahan reagen pada virtual lab.',
    icon: Beaker,
  },
  {
    id: 3,
    title: 'Eksperimen',
    description: 'Lakukan titrasi dan amati perubahan indikator warna.',
    icon: PenTool,
  },
  {
    id: 4,
    title: 'Analisis',
    description: 'Hitung hasil dan dapatkan laporan evaluasi otomatis.',
    icon: CheckCircle2,
  },
  {
    // Tambahan langkah ke-5 untuk melengkapi formasi "V"
    id: 5,
    title: 'Laporan',
    description: 'Melihat perkembangan dan hasil pembelajaran keseluruhan.',
    icon: FileText,
  },
];

const FlowSection = () => {
  return (
    <section className="relative min-h-screen  w-full bg-[#FDF8F5] overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground drop-shadow-[4px_4px_0px_#D3CDF4] uppercase tracking-widest mb-6">
            Alchemist
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground drop-shadow-[4px_4px_0px_#D3CDF4] uppercase tracking-widest mb-6">
            Learning Flow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {flowSteps.map((step, index) => {
            // Logika penempatan baris dan kolom pada Grid 3 Kolom
            let gridPlacement = '';

            switch (index) {
              case 0: // Step 1
                gridPlacement = 'md:col-start-1 md:row-start-1';
                break;
              case 1: // Step 2 (Berada di bawah step 1, kita geser sedikit ke kanan)
                gridPlacement = 'md:col-start-1 md:row-start-2 md:translate-x-8 lg:translate-x-16';
                break;
              case 2: // Step 3 (Berada di tengah bawah)
                gridPlacement = 'md:col-start-2 md:row-start-3';
                break;
              case 3: // Step 4 (Berada di bawah step 5, kita geser sedikit ke kiri)
                gridPlacement =
                  'md:col-start-3 md:row-start-2 md:-translate-x-8 lg:-translate-x-16';
                break;
              case 4: // Step 5
                gridPlacement = 'md:col-start-3 md:row-start-1';
                break;
              default:
                break;
            }

            return (
              <div
                key={step.id}
                // Tambahkan variabel gridPlacement di sini
                className={`relative flex flex-col items-center text-center p-8 bg-card border-4 border-dashed border-ring rounded-2xl transition-all duration-300 group shadow-[8px_8px_0px_0px_rgba(211,205,244,0.5)] hover:shadow-[12px_12px_0px_0px_rgba(211,205,244,0.8)] hover:-translate-y-2 ${gridPlacement}`}
              >
                {/* Step Number Badge */}
                {/* Sesuai gambar, letak badge ada di kiri atas */}
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(26,42,122,1)] group-hover:scale-110 transition-transform duration-300">
                  {step.id}
                </div>

                {/* Icon Container */}
                {step.icon && (
                  <div className="w-20 h-20 bg-secondary/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                )}

                <h3 className="text-sm md:text-base font-bold text-foreground mb-3 leading-relaxed">
                  {step.title}
                </h3>

                <p className="text-[10px] md:text-xs text-foreground/70 font-sans leading-loose tracking-wide">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" bottom-0 flex w-full ">
        <Sheet />
      </div>
    </section>
  );
};

export default FlowSection;
