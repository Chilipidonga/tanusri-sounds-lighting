import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact'; // Contact Component import chesam
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Home Page Layout (Anni sections oke page lo)
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <Contact /> {/* Footer & Contact Details */}
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-darkbg text-white min-h-screen">
        <Routes>
          {/* 1. Public Route - Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;