import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Page move avvadaniki

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error chupinchadaniki
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Token ni save cheyyali
        localStorage.setItem('token', data.token);
        // Dashboard ki vellu
        navigate('/dashboard');
      } else {
        // Fail: Error chupinchu
        setError(data.error || 'Login Failed');
      }
    } catch (err) {
      setError('Server Error. Is Backend Running?');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-neon w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                placeholder="admin@tanusri.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:bg-white transition"
          >
            Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;