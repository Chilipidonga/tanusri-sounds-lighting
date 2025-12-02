import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, LogOut, CheckCircle, Trash2, Edit2, Loader, X, Images } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  // Form Input States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Sound');
  
  // File States
  const [mainFile, setMainFile] = useState(null); 
  const [galleryFiles, setGalleryFiles] = useState([]); 

  // Edit Mode States
  const [editId, setEditId] = useState(null); // ID unte Edit Mode, null unte Add Mode
  const [existingGallery, setExistingGallery] = useState([]); // Photos currently in database

  // System States
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // For button loading
  const [fetching, setFetching] = useState(true); // For initial list loading
  const [message, setMessage] = useState('');

  // --- 1. LOGOUT ---
  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  // --- 2. FETCH SERVICES (Load List) ---
  const fetchServices = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/services/all');
        const data = await response.json();
        setServices(data);
    } catch (error) { 
        console.error("Error fetching services:", error); 
    } finally { 
        setFetching(false); 
    }
  };

  useEffect(() => { fetchServices(); }, []);

  // --- 3. ENTER EDIT MODE ---
  const handleEditClick = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setCategory(service.category);
    setEditId(service._id);
    
    // Patha gallery photos ni load cheyyi
    setExistingGallery(service.gallery || []);
    
    // Reset file inputs (User kothavi pedithe ne marustam)
    setMainFile(null);
    setGalleryFiles([]); 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage('✏️ Editing Mode: Update details below');
  };

  // --- 4. CANCEL EDIT ---
  const cancelEdit = () => {
    setTitle(''); setDescription(''); setCategory('Sound'); setMainFile(null); setGalleryFiles([]);
    setExistingGallery([]);
    setEditId(null); setMessage('');
  };

  // --- 5. REMOVE SINGLE GALLERY IMAGE (Backend Call) ---
  const handleRemoveImage = async (imgUrl) => {
    if(!confirm("Delete this photo from gallery?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/services/remove-image/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: imgUrl })
        });

        if (response.ok) {
            // UI Update: Remove image locally instantly
            setExistingGallery(existingGallery.filter(img => img !== imgUrl));
            fetchServices(); // Sync with backend
            setMessage("Image removed successfully!");
        } else {
            setMessage("Failed to remove image");
        }
    } catch (error) {
        console.error(error);
        setMessage("Server Error");
    }
  };

  // --- 6. SUBMIT FORM (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', "Contact"); // Default price

    // Add Main Image if selected
    if (mainFile) formData.append('image', mainFile);
    
    // Add Multiple Gallery Images
    for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery', galleryFiles[i]);
    }

    try {
      let url = 'http://localhost:5000/api/services/add';
      let method = 'POST';

      if (editId) {
        url = `http://localhost:5000/api/services/update/${editId}`;
        method = 'PUT';
      } else {
        // Validation for New Service
        if (!mainFile) { 
            setMessage('Main image is required!'); 
            setLoading(false); 
            return; 
        }
      }

      const response = await fetch(url, { method, body: formData });
      const data = await response.json();

      if (response.ok) {
        setMessage(editId ? '✅ Updated Successfully!' : '✅ Added Successfully!');
        cancelEdit(); // Clear form
        fetchServices(); // Refresh list
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) { 
        setMessage('Server Error'); 
    } finally { 
        setLoading(false); 
    }
  };

  // --- 7. DELETE ENTIRE SERVICE ---
  const handleDelete = async (id) => {
    if(!confirm("Are you sure? This will delete the service and all its photos.")) return;
    
    try {
        const response = await fetch(`http://localhost:5000/api/services/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
            setServices(services.filter(s => s._id !== id));
            if (editId === id) cancelEdit(); // If editing same item, cancel edit
        }
    } catch (error) {
        console.error(error);
    }
  };

  // --- UI RENDER ---
  return (
    <div className="min-h-screen bg-darkbg p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* TOP HEADER */}
        <div className="lg:col-span-2 flex justify-between items-center border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold">Admin <span className="text-neon">Panel</span></h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* --- LEFT SIDE: FORM --- */}
        <div className={`bg-gray-900 rounded-2xl p-8 border shadow-xl h-fit transition-colors duration-300 ${editId ? 'border-neon' : 'border-gray-800'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                {editId ? <><Edit2 className="text-neon" /> Edit Service</> : <><Upload className="text-neon" /> New Service</>}
            </h2>
            {editId && (
                <button onClick={cancelEdit} className="text-sm bg-gray-800 px-3 py-1 rounded-full text-gray-400 hover:text-white transition">
                    Cancel Edit
                </button>
            )}
          </div>

          {message && (
            <div className={`p-3 rounded mb-4 text-center font-bold ${message.includes('Error') || message.includes('Failed') ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-neon'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-gray-400 mb-2 text-sm">Service Name</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-gray-700 text-white rounded-lg p-3 focus:border-neon focus:outline-none" placeholder="Ex: DJ Setup" required />
            </div>

            {/* Category */}
            <div>
                <label className="block text-gray-400 mb-2 text-sm">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-gray-700 text-white rounded-lg p-3 focus:border-neon focus:outline-none">
                    <option value="Sound">Sound System</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Stage">Stage & LED</option>
                </select>
            </div>

            {/* --- EXISTING GALLERY (Only in Edit Mode) --- */}
            {editId && existingGallery.length > 0 && (
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-3 flex items-center gap-2"><Images size={14}/> Manage Gallery Photos:</p>
                    <div className="grid grid-cols-4 gap-2">
                        {existingGallery.map((img, idx) => (
                            <div key={idx} className="relative group h-16 w-16">
                                <img src={img} className="w-full h-full object-cover rounded border border-gray-600" alt="gallery thumbnail" />
                                <button 
                                    type="button"
                                    onClick={() => handleRemoveImage(img)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition transform hover:scale-110"
                                    title="Delete photo"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* File Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Image */}
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">{editId ? "Change Cover (Optional)" : "Main Cover Photo"}</label>
                    <label className="flex items-center justify-center bg-black border border-gray-700 text-white rounded-lg p-3 cursor-pointer hover:border-neon truncate transition">
                        <input type="file" onChange={e => setMainFile(e.target.files[0])} className="hidden" accept="image/*" />
                        {mainFile ? <span className="text-green-400 flex gap-2 text-xs truncate"><CheckCircle size={16}/> {mainFile.name}</span> : <span className="text-gray-500 flex gap-2 text-xs"><Upload size={16}/> Select Main</span>}
                    </label>
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Add Gallery Photos</label>
                    <label className="flex items-center justify-center bg-black border border-dashed border-gray-600 text-white rounded-lg p-3 cursor-pointer hover:border-neon truncate transition">
                        <input type="file" onChange={e => setGalleryFiles(e.target.files)} className="hidden" accept="image/*" multiple />
                        {galleryFiles.length > 0 ? <span className="text-neon flex gap-2 text-xs truncate"><Images size={16}/> {galleryFiles.length} New Files</span> : <span className="text-gray-500 flex gap-2 text-xs"><Images size={16}/> Select Multiple</span>}
                    </label>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-gray-400 mb-2 text-sm">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black border border-gray-700 text-white rounded-lg p-3 h-24 focus:border-neon focus:outline-none" placeholder="Enter service details..." required></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold text-lg transition ${loading ? 'bg-gray-700 text-gray-400' : editId ? 'bg-neon text-black hover:bg-white' : 'bg-white text-black hover:bg-neon'}`}>
              {loading ? 'Processing...' : editId ? 'Update Service' : 'Publish Service'}
            </button>
          </form>
        </div>

        {/* --- RIGHT SIDE: LIST --- */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl h-[700px] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6">Services List ({services.length})</h2>
            
            {fetching ? <Loader className="animate-spin text-neon mx-auto mt-20"/> : (
                <div className="space-y-4">
                    {services.length === 0 ? <p className="text-gray-500 text-center">No services uploaded yet.</p> : 
                    services.map((service) => (
                        <div key={service._id} className={`flex items-center justify-between p-4 border rounded-xl transition ${editId === service._id ? 'bg-neon/10 border-neon' : 'bg-black/50 border-gray-800 hover:border-gray-600'}`}>
                            
                            {/* Service Info */}
                            <div className="flex items-center gap-4">
                                <img src={service.image} className="w-16 h-16 rounded-lg object-cover" alt="service" />
                                <div>
                                    <h3 className="font-bold text-white text-sm md:text-base">{service.title}</h3>
                                    <div className="flex gap-2 text-xs text-gray-400 mt-1">
                                        <span className={`px-2 py-0.5 rounded-full ${service.category === 'Sound' ? 'bg-blue-900/50 text-blue-300' : service.category === 'Lighting' ? 'bg-purple-900/50 text-purple-300' : 'bg-green-900/50 text-green-300'}`}>
                                            {service.category}
                                        </span>
                                        {/* Gallery Badge */}
                                        {service.gallery && service.gallery.length > 0 && (
                                            <span className="text-neon flex items-center gap-1 bg-gray-800 px-2 py-0.5 rounded-full">
                                                <Images size={10}/> +{service.gallery.length}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(service)} className="p-2 bg-blue-600/20 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition" title="Edit">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(service._id)} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;