'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ModulAlatBahanTitrasi,ModulDasarTitrasi, ModulIndikator, ModulKeselamatan, ModulPenerapan, ModulPengelolaanLimbah, ModulPengenalanAsamBasa, ModulPerhitungan } from './modul-content';

const MODULES = [
  'Keselamatan Kerja Laboratorium',
  'Pengelolaan Limbah Laboratorium',
  'Pengenalan Asam dan Basa',
  'Indikator Asam-Basa',
  'Dasar Titrasi Asam Basa',
  'Alat dan Bahan Titrasi',
  'Perhitungan Titrasi Asam-Basa',
  'Penerapan Titrasi Asam Basa',
];

export default function PraktikumSection() {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <section className="min-h-screen bg-slate-50 flex flex-col p-4 md:p-8 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="max-w-full w-full mx-auto flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/menu" className="text-primary hover:text-primary/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-primary drop-shadow-[2px_2px_0px_#D3CDF4]">
            ALCHEMIST MODUL
          </h1>
        </div>
        <div className="hidden md:flex gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-pink-500"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-full w-full  flex-1 bg-white border-4 border-primary rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] flex flex-col md:flex-row relative z-10">
        
        {/* Sidebar */}
        <div className="w-full md:w-[350px] bg-slate-50 border-b-4 md:border-b-0 md:border-r-4 border-primary p-6 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-widest uppercase mb-4 text-center">
            Daftar Materi
          </h2>
          {MODULES.map((modul, index) => {
            const isActive = activeModule === index;
            return (
              <button
                key={index}
                onClick={() => setActiveModule(index)}
                className={`w-full py-4 px-6 rounded-xl border-2 transition-all duration-200 text-center font-bold text-sm md:text-base ${
                  isActive
                    ? 'bg-purple-200 border-purple-400 text-primary shadow-inner scale-[0.98]'
                    : 'bg-white border-primary/20 text-primary hover:bg-slate-100 hover:border-primary/50'
                }`}
              >
                {modul}
              </button>
            );
          })}
          <Image 
            src={'/images/bunga.webp'} 
            alt='bunga'
            width={550}
            
            height={550}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-12 relative overflow-y-auto bg-white">
          {/* Top content header: Modul Badge & Hearts */}
          <div className="flex items-center justify-between mb-8">
            <div className="px-6 py-2 bg-purple-400 text-white font-bold rounded-lg shadow-sm">
              Modul {activeModule + 1}
            </div>
            <div className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            {MODULES[activeModule]}
          </h1>

          {activeModule === 0 && <ModulKeselamatan />}
          {activeModule === 1 && <ModulPengelolaanLimbah />}
          {activeModule === 2 && <ModulPengenalanAsamBasa />}
          {activeModule === 3 && <ModulIndikator />}
          {activeModule === 4 && <ModulDasarTitrasi />}
          {activeModule === 5 && <ModulAlatBahanTitrasi />}
          {activeModule === 6 && <ModulPerhitungan />}
          {activeModule === 7 && <ModulPenerapan />}

          {/* Placeholder for other modules */}
          {![0, 1, 2, 3, 4, 5, 6, 7].includes(activeModule) && (
            <div className="text-slate-500 italic mt-10">
              Materi untuk modul ini sedang dalam pengembangan...
            </div>
          )}

          {/* Character Image positioned absolute at bottom right */}
          <div className="absolute bottom-0 right-0 w-32 md:w-48 xl:w-64 z-20 pointer-events-none">
            <Image 
              src="/images/char-2.webp" 
              alt="Alchemist Character" 
              width={256} 
              height={256} 
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
