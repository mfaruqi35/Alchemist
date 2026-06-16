'use client';

import Image from 'next/image';
import { useState } from 'react';

import AlchemistSVGNoBg from '@/components/molekule/alchemist-no-bg';

export default function TestSection() {
  const [currentQuestion, setCurrentQuestion] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const totalQuestions = 5;

  const question = {
    text: 'Alat laboratorium yang digunakan untuk meneteskan larutan titran secara terukur selama proses titrasi adalah',
    options: [
      { id: 'A', text: 'Basa kuat' },
      { id: 'B', text: 'Basa lemah' },
      { id: 'C', text: 'Asam' },
      { id: 'D', text: 'Netral' },
    ],
  };

  return (
    <section className="relative w-full  flex flex-col items-center justify-center overflow-hidden py-10">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <AlchemistSVGNoBg />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-4 md:gap-8 px-4">
        {/* Progress Bar */}
        <div className="w-full max-w-[400px] h-6 md:h-8 bg-[#D8D2FA] border-[3px] border-[#4B2F89] rounded-xl overflow-hidden shadow-[2px_2px_0px_#4B2F89] relative flex items-center p-1">
          <div
            className="h-full bg-[#8A58D8] rounded-md transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Frame */}
        <div className="relative w-full min-h-screen flex flex-col items-center justify-start p-8 sm:p-16 md:p-24 lg:p-32 xl:p-40">
          {/* Background Border */}
          <div className="absolute inset-0 w-full h-full -z-10 -translate-y-20 flex items-center justify-center">
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
          <div className="flex flex-col items-center justify-start  w-full max-w-3xl gap-4 md:gap-6 lg:gap-8 rounded-lg ">
            {/* Question Number */}
            <div className="flex justify-center mb-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-[#4B2F89] drop-shadow-[3px_3px_0px_#D3CDF4]">
                {currentQuestion}
              </span>
            </div>

            {/* Question Box */}
            <div className="w-full border-[2px] md:border-[3px] border-dotted border-[#62B2E6] p-4 md:p-8 bg-white/60  backdrop-blur-sm">
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

            {/* Navigation / Next Button (Mockup functionality) */}
            {selectedOption && (
              <div className="mt-4 md:mt-8 flex justify-end w-full px-2 md:px-12">
                <button
                  onClick={() => {
                    if (currentQuestion < totalQuestions) setCurrentQuestion((c) => c + 1);
                    setSelectedOption(null);
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
