import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Black Overlay - Text clear ga kanipinchadaniki */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        
        {/* Subtitle */}
        <p className="text-neon font-medium tracking-widest mb-4 uppercase animate-pulse">
          Professional Lighting & Sound
        </p>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Bring Your Event <br />
          To <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-purple-500">Life</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          We provide premium audio-visual experiences for weddings, concerts, and corporate events. Let's make it memorable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="group bg-neon text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 flex items-center">
            Book Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 rounded-full font-bold text-white border border-gray-600 hover:border-neon hover:text-neon transition-all duration-300">
            View Gallery
          </button>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-darkbg to-transparent"></div>
    </div>
  );
};

export default Hero;