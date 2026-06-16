import Image from 'next/image';

const MapSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center mt-25 justify-center overflow-hidden">
      {/* Map Image as Full Background or Main Content */}
      <div className="absolute  inset-0 w-full h-full flex items-center justify-center">
        <Image 
          src="/images/Maps.webp" 
          alt="Alchemist World Map" 
        fill
          priority
          className="object-cover md:object-contain"
          
        />
      </div>

      {/* Foreground Interactive Content / Title */}
      <div className="relative z-10 flex flex-col items-center text-center p-4">
        {/* You can add pins/buttons over the map here in the future */}
      </div>
    </section>
  );
};

export default MapSection;
