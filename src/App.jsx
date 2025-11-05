import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Loading from './components/Loading.jsx';
import Pages from './components/Pages.jsx';

const useHashRoute = () => {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    const handler = () => setPath(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  const navigate = (to) => {
    window.location.hash = to;
  };
  return [path, navigate];
};

function App() {
  const [path, navigate] = useHashRoute();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('wec_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem('wec_cart');
    return raw ? JSON.parse(raw) : [];
  });

  // Initial short loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Persist
  useEffect(() => {
    if (user) localStorage.setItem('wec_user', JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem('wec_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('wec_user');
    // If on restricted page, go home
    if (path.startsWith('/cart') || path.startsWith('/checkout') || path.startsWith('/profile') || path.startsWith('/dashboard')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-yellow-50">
      <Loading show={loading} />
      <Navbar user={user} cartCount={cart.length} onNavigate={navigate} onLogout={handleLogout} />
      <main className="flex-1">
        <Pages
          path={path}
          user={user}
          setUser={setUser}
          cart={cart}
          setCart={setCart}
          onNavigate={navigate}
          setLoading={setLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
