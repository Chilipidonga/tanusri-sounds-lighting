import { useState } from 'react';
import { Lock, User, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 👇 Ikkada mee LIVE BACKEND LINK pettam
const API_URL = "https://tanusri-server.onrender.com";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state add chesam
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Fetch URL ni API_URL tho replace chesam
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Token save chesi Dashboard ki vellu
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        // Fail: Error chupinchu
        setError(data.error || 'Login Failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-neon w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="text-gray-400 mt-2">Enter credentials to manage website</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4 text-center text-sm font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition"
                placeholder="admin@tanusri.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg transition-all duration-200 flex justify-center items-center ${loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-neon text-black hover:bg-white hover:scale-105'}`}
          >
            {loading ? <Loader className="animate-spin" /> : 'Access Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;