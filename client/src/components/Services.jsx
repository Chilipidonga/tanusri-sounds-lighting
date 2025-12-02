import { useState, useEffect } from 'react';
import { Music, Zap, Monitor, Loader, X, ChevronRight } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/services/all')
      .then(res => res.json())
      .then(data => { setServices(data); setLoading(false); })
      .catch(err => console.error(err));
  }, []);

  const getIcon = (category) => {
    if (category === 'Lighting') return <Zap className="h-12 w-12 text-purple-500 mb-4" />;
    if (category === 'Stage') return <Monitor className="h-12 w-12 text-blue-500 mb-4" />;
    return <Music className="h-12 w-12 text-neon mb-4" />;
  };

  return (
    <section className="py-20 bg-darkbg" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-neon">Services</span></h2>
        </div>

        {loading ? <div className="text-center"><Loader className="animate-spin text-neon inline" /></div> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-neon transition group">
                <div className="h-48 relative overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    {/* Badge: Shows how many extra photos are there */}
                    {service.gallery && service.gallery.length > 0 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-neon/50">
                            +{service.gallery.length} Photos
                        </div>
                    )}
                </div>
                <div className="p-6">
                  {getIcon(service.category)}
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <button onClick={() => setSelectedService(service)} className="w-full py-3 mt-4 rounded-lg border border-gray-600 text-white hover:bg-neon hover:text-black font-semibold transition">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- POP-UP MODAL (Kotha Design) --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            {/* Modal Box */}
            <div className="bg-gray-900 border border-neon rounded-2xl max-w-5xl w-full shadow-2xl relative animate-fadeIn my-auto">
                
                {/* Close Button */}
                <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-neon hover:text-black transition"><X size={24} /></button>

                <div className="p-6 md:p-8">
                    {/* Top Section: Info & Main Image */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                         {/* Main Info */}
                        <div className="flex-1 order-2 md:order-1">
                            <h3 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h3>
                            <span className="inline-block bg-gray-800 text-neon px-3 py-1 rounded-full text-sm mb-4">{selectedService.category}</span>
                            <p className="text-gray-300 leading-relaxed mb-6 border-l-4 border-neon pl-4">{selectedService.description}</p>
                            <button className="bg-neon text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition w-full md:w-auto" onClick={() => window.location.href = "#contact"}>Book This Setup</button>
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 h-64 md:h-80 rounded-xl overflow-hidden border border-gray-700 order-1 md:order-2">
                             <img src={selectedService.image} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* GALLERY GRID (Bottom Section) */}
                    {selectedService.gallery && selectedService.gallery.length > 0 ? (
                        <div className="border-t border-gray-800 pt-6">
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2 text-neon"><ChevronRight size={20}/> Gallery Photos</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {selectedService.gallery.map((img, index) => (
                                    <div key={index} className="h-32 rounded-lg overflow-hidden border border-gray-800 hover:border-neon transition cursor-pointer group relative">
                                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                       <p className="text-gray-600 text-sm mt-4 italic text-center border-t border-gray-800 pt-4">No extra photos available for this service.</p>
                    )}
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default Services;