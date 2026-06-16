import Image from 'next/image';
import { ClipboardList, FlaskConical, Bot, TrendingUp } from 'lucide-react';
const features = [
  {
    title: 'Assessment & Quiz',
    description: 'Ukur pemahaman dan evaluasi hasil belajar melalui soal interaktif.',
    icon: ClipboardList,
    color: 'text-primary',
    bg: 'bg-secondary/30',
  },
  {
    title: 'Virtual Laboratory',
    description: 'Lakukan praktikum titrasi asam-basa dalam workspace laboratorium virtual.',
    icon: FlaskConical,
    color: 'text-primary',
    bg: 'bg-secondary/30',
  },
  {
    title: 'AI Learning Assistant',
    description: 'Dapatkan bantuan belajar dan penjelasan materi melalui AI Assistant',
    icon: Bot,
    color: 'text-primary',
    bg: 'bg-secondary/30',
  },
  {
    title: 'Learning Report',
    description: 'Lihat perkembangan pembelajaran dan hasil eksperimen.',
    icon: TrendingUp,
    color: 'text-primary',
    bg: 'bg-secondary/30',
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
          
          {/* Left Side: Title and Character */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="relative">
               <h2 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-[4px_4px_0px_#D3CDF4] uppercase tracking-widest relative z-10">
                 FEATURES
               </h2>
            </div>
            
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] mx-auto lg:mx-0 animate-float">
              <Image 
                src="/images/char.webp" 
                alt="Scientist Character" 
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(26,42,122,0.3)]"
              />
            </div>
            
            <p className="text-[10px] md:text-xs text-foreground/80 leading-loose max-w-sm mt-4 font-sans tracking-wide">
              Fitur-fitur unggulan yang membantu memahami konsep titrasi melalui eksperimen virtual.
            </p>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-8 bg-card border-[3px] border-dashed border-ring rounded-2xl hover-lift transition-all duration-300 group shadow-[8px_8px_0px_0px_rgba(211,205,244,0.5)] hover:shadow-[12px_12px_0px_0px_rgba(211,205,244,0.8)]"
              >
                <div className={`w-32 h-32 rounded-2xl flex items-center justify-center mb-8 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-16 h-16 ${feature.color}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-4 leading-relaxed">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-foreground/70 leading-loose font-sans tracking-wide">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
     
    </section>
  );
};

export default FeaturesSection;
