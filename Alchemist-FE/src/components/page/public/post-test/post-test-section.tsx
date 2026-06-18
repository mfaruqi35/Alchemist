'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AlchemistSVGNoBg from '@/components/molekule/alchemist-no-bg';

export default function PostTestSection() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const totalQuestions = 5;

  const questions = [
    {
      text: 'Larutan yang konsentrasinya sudah diketahui secara pasti dalam titrasi disebut...',
      options: [
        { id: 'A', text: 'Larutan indikator' },
        { id: 'B', text: 'Larutan standar' },
        { id: 'C', text: 'Larutan buffer' },
        { id: 'D', text: 'Larutan jenuh' },
      ],
      answer: 'B',
    },
    {
      text: 'Fungsi erlenmeyer dalam titrasi asam-basa adalah...',
      options: [
        { id: 'A', text: 'Tempat larutan titran' },
        { id: 'B', text: 'Mengukur volume larutan secara presisi' },
        { id: 'C', text: 'Tempat larutan yang dititrasi' },
        { id: 'D', text: 'Meneteskan larutan secara bertahap' },
      ],
      answer: 'C',
    },
    {
      text: 'Sebanyak 25 mL NaOH dititrasi menggunakan HCl 0,2 M. Volume HCl yang diperlukan hingga titik ekivalen adalah 20 mL. Konsentrasi NaOH adalah...',
      options: [
        { id: 'A', text: '0,10 M' },
        { id: 'B', text: '0,16 M' },
        { id: 'C', text: '0,20 M' },
        { id: 'D', text: '0,25 M' },
      ],
      answer: 'B',
    },
    {
      text: 'Hasil teoritis menunjukkan titik ekivalen tercapai pada 20 mL HCl, tetapi hasil eksperimen menunjukkan 17 mL. Penyebab yang paling mungkin adalah...',
      options: [
        { id: 'A', text: 'Titrasi berhenti sebelum titik akhir tercapai' },
        { id: 'B', text: 'Larutan tidak bereaksi' },
        { id: 'C', text: 'Konsentrasi larutan menjadi nol' },
        { id: 'D', text: 'Indikator tidak larut dalam larutan' },
      ],
      answer: 'A',
    },
    {
      text: 'Setelah praktikum selesai, larutan sisa masih bersifat basa. Tindakan yang tepat adalah...',
      options: [
        { id: 'A', text: 'Membuang ke wastafel langsung' },
        { id: 'B', text: 'Membuang ke wadah limbah basa yang sesuai' },
        { id: 'C', text: 'Menyimpan di meja laboratorium' },
        { id: 'D', text: 'Menambahkan indikator lalu membuangnya' },
      ],
      answer: 'B',
    },
  ];

  const question = questions[currentQuestion - 1];

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-10">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mt-15">
        <AlchemistSVGNoBg />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-4 md:gap-8 px-4">
        {/* Progress Bar */}
        <div className="w-full max-w-[400px] h-6 md:h-8 bg-[#D8D2FA] border-[3px] border-[#4B2F89] rounded-xl overflow-hidden shadow-[2px_2px_0px_#4B2F89] relative flex items-center p-1 translate-y-20">
          <div
            className="h-full bg-[#8A58D8] rounded-md transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Frame */}
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
          {/* Background Border */}
          <div className="absolute inset-0 w-full h-full -z-10 flex items-center justify-center">
            <Image
              src="/images/borderDiagnostig.webp"
              alt="Retro Frame"
              width={1024}
              height={1024}
              priority
              className="object-fill sm:object-contain drop-shadow-2xl"
            />
          </div>
          {/* Inner Content Container */}
          <div className="flex flex-col items-center justify-start mt-5 w-full max-w-3xl gap-4 md:gap-6 lg:gap-8 rounded-lg">
            {/* Question Box */}
            <div className="w-full border-[2px] md:border-[3px] border-dotted border-[#62B2E6] p-4 md:p-8 bg-white/60 backdrop-blur-sm">
              <p className="text-center text-[#4B2F89] text-sm sm:text-base md:text-xl font-medium leading-relaxed">
                {question.text}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col w-full gap-2 md:gap-0 px-2 md:px-12">
              {question.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`text-left flex gap-1 text-sm sm:text-md md:text-sm p-2 md:p-3 rounded transition-all duration-200 ${
                    selectedOption === opt.id
                      ? 'bg-[#E9E4FC] font-bold text-[#4B2F89]'
                      : 'text-[#4B2F89] hover:bg-[#E9E4FC]/50 hover:font-bold hover:translate-x-2'
                  }`}
                >
                  <span className="min-w-[24px] md:min-w-[32px]">{opt.id}.</span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Navigation / Next Button */}
            {selectedOption && (
              <div className="-translate-y-5">
                <button
                  onClick={() => {
                    if (currentQuestion < totalQuestions) {
                      setCurrentQuestion((c) => c + 1);
                      setSelectedOption(null);
                    } else {
                      router.push('/menu');
                    }
                  }}
                  className="px-6 py-3 bg-secondary text-secondary-foreground text-xs md:text-base border-[3px] border-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[4px_4px_0px_0px_rgba(26,42,122,1)] active:shadow-[0px_0px_0px_0px_rgba(26,42,122,1)] active:translate-y-1 active:translate-x-1 uppercase font-bold tracking-widest"
                >
                  {currentQuestion === totalQuestions ? 'Finish' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
