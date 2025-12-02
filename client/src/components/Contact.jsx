import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, User } from 'lucide-react';

const Contact = () => {
  return (
    <section className="bg-black text-white pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Side: Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Contact <span className="text-neon">Us</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Planning a wedding, concert, or corporate event? 
              Reach out to TanuSri Sounds for the best audio-visual experience.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-neon transition-colors duration-300">
                  <Phone className="text-neon group-hover:text-black" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Call Us</p>
                  <p className="text-xl font-bold">+91 98765 43210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-neon transition-colors duration-300">
                  <Mail className="text-neon group-hover:text-black" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="text-xl font-bold">bookings@tanusri.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-neon transition-colors duration-300">
                  <MapPin className="text-neon group-hover:text-black" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Visit Us</p>
                  <p className="text-xl font-bold">Psaladeevi, Narsapur Mandal,534280</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Proprietor / Owner Card */}
          <div className="relative flex justify-center md:justify-end">
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-neon/10 blur-3xl rounded-full"></div>
            
            <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center max-w-sm w-full shadow-2xl hover:border-neon transition-all duration-300 group">
                
                {/* Profile Image Circle */}
                <div className="w-40 h-40 mx-auto mb-6 relative">
                    {/* Rotating Border Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon animate-[spin_10s_linear_infinite]"></div>
                    
                    {/* IMAGE TAG - Change the src link below to real owner photo */}
                    <img 
                        src="/owner.jpg" 
                        alt="Proprietor" 
                        className="w-full h-full object-cover rounded-full border-4 border-gray-900"
                    />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">G.Lakshmi Narayana</h3>
                <p className="text-neon font-medium tracking-wide uppercase text-sm mb-4">Proprietor</p>
                
                <p className="text-gray-400 text-sm italic mb-6">
                  "Dedicated to making your events memorable with the best sound & light experience."
                </p>

                {/* Social Links for Owner */}
                <div className="flex justify-center space-x-4 border-t border-gray-800 pt-4">
                    <a href="#" className="p-2 bg-black rounded-full text-gray-400 hover:text-neon transition"><Facebook size={18} /></a>
                    <a href="#" className="p-2 bg-black rounded-full text-gray-400 hover:text-neon transition"><Instagram size={18} /></a>
                    <a href="#" className="p-2 bg-black rounded-full text-gray-400 hover:text-neon transition"><Twitter size={18} /></a>
                </div>
            </div>
          </div>

        </div>

        {/* Footer Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2024 TanuSri Sounds & Lighting. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
                 Built with <span className="text-neon">❤</span> for Events
            </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;