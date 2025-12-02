import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react'; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-neon" /> {/* Lightning Icon */}
            <span className="ml-2 text-xl font-bold text-white tracking-wider">
              TanuSri <span className="text-neon">Sounds</span>
            </span>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="hover:text-neon px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="hover:text-neon px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#" className="hover:text-neon px-3 py-2 rounded-md text-sm font-medium">Gallery</a>
              <button className="bg-neon text-black px-4 py-2 rounded-full font-bold hover:bg-white transition">
                Book Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 pb-5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-300 hover:text-neon block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:text-neon block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-gray-300 hover:text-neon block px-3 py-2 rounded-md text-base font-medium">Gallery</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;