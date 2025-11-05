import React from 'react';

const Navbar = ({ user, cartCount, onNavigate, onLogout }) => {
  return (
    <nav className="w-full bg-blue-600 text-white sticky top-0 z-40 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/') }>
          <span className="text-2xl">🦁</span>
          <div className="leading-tight text-left">
            <div className="font-bold text-lg">Web e-canteen FT</div>
            <div className="text-xs opacity-90">Kantin Online Fakultas Teknik</div>
          </div>
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => onNavigate('/')} className="hover:bg-blue-700 px-3 py-2 rounded transition text-sm">Beranda</button>
          {user && user.role === 'pembeli' && (
            <button onClick={() => onNavigate('/cart')} className="relative hover:bg-blue-700 px-3 py-2 rounded transition text-sm">
              Keranjang
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          {user ? (
            <>
              <button onClick={() => onNavigate('/profile')} className="hover:bg-blue-700 px-3 py-2 rounded transition text-sm">Profil</button>
              {(user.role === 'admin' || user.role === 'penjual') && (
                <button onClick={() => onNavigate('/dashboard')} className="hover:bg-blue-700 px-3 py-2 rounded transition text-sm">Dashboard</button>
              )}
              <button onClick={onLogout} className="bg-yellow-400 text-blue-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 transition text-sm">Logout</button>
            </>
          ) : (
            <button onClick={() => onNavigate('/auth')} className="bg-yellow-400 text-blue-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 transition text-sm">Login / Register</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
