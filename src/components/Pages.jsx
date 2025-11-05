import React, { useEffect, useMemo, useState } from 'react';

// Dummy data tenant & menu
const TENANTS = [
  {
    id: 't1',
    name: 'Warung Bu Sari',
    category: 'Makanan',
    icon: 'https://placehold.co/48x48?text=🍲',
    photo: 'https://placehold.co/600x300?text=Warung+Bu+Sari',
    menus: [
      { id: 'm1', name: 'Nasi Goreng', price: 18000, photo: 'https://placehold.co/300x200?text=Nasi+Goreng' },
      { id: 'm2', name: 'Ayam Bakar', price: 25000, photo: 'https://placehold.co/300x200?text=Ayam+Bakar' },
      { id: 'm3', name: 'Soto Ayam', price: 20000, photo: 'https://placehold.co/300x200?text=Soto+Ayam' },
    ],
  },
  {
    id: 't2',
    name: 'Kedai Es Seger',
    category: 'Minuman',
    icon: 'https://placehold.co/48x48?text=🥤',
    photo: 'https://placehold.co/600x300?text=Kedai+Es+Seger',
    menus: [
      { id: 'm4', name: 'Es Teh Manis', price: 8000, photo: 'https://placehold.co/300x200?text=Es+Teh' },
      { id: 'm5', name: 'Es Jeruk', price: 10000, photo: 'https://placehold.co/300x200?text=Es+Jeruk' },
      { id: 'm6', name: 'Jus Alpukat', price: 15000, photo: 'https://placehold.co/300x200?text=Jus+Alpukat' },
    ],
  },
  {
    id: 't3',
    name: 'Bakmie Pak Joko',
    category: 'Makanan',
    icon: 'https://placehold.co/48x48?text=🍜',
    photo: 'https://placehold.co/600x300?text=Bakmie+Pak+Joko',
    menus: [
      { id: 'm7', name: 'Mie Ayam', price: 14000, photo: 'https://placehold.co/300x200?text=Mie+Ayam' },
      { id: 'm8', name: 'Bakso Urat', price: 17000, photo: 'https://placehold.co/300x200?text=Bakso' },
      { id: 'm9', name: 'Pangsit Goreng', price: 12000, photo: 'https://placehold.co/300x200?text=Pangsit' },
    ],
  },
];

// Helpers localStorage
const storage = {
  getUser: () => {
    const raw = localStorage.getItem('wec_user');
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (u) => localStorage.setItem('wec_user', JSON.stringify(u)),
  clearUser: () => localStorage.removeItem('wec_user'),
  getCart: () => {
    const raw = localStorage.getItem('wec_cart');
    return raw ? JSON.parse(raw) : [];
  },
  setCart: (c) => localStorage.setItem('wec_cart', JSON.stringify(c)),
};

const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// Simple Router
const useHashRoute = () => {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    const handler = () => setPath(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  const navigate = (to) => {
    if (to === path) return;
    window.location.hash = to;
  };
  return [path, navigate];
};

// Pages
const Home = ({ onOpenTenant }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-extrabold">Selamat datang di Web e-canteen FT</h1>
          <p className="mt-2 text-blue-50">Pesan makanan dan minuman favoritmu dari berbagai tenant di Fakultas Teknik.</p>
        </div>
        <img alt="hero" src="https://placehold.co/220x140?text=E-Canteen" className="rounded-md shadow-lg" />
      </div>
      <h2 className="mt-8 text-xl font-bold text-blue-800">Tenant Tersedia</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {TENANTS.map((t) => (
          <button key={t.id} onClick={() => onOpenTenant(t.id)} className="text-left bg-white border border-blue-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src={t.photo} alt={t.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <img src={t.icon} alt="icon" className="w-6 h-6" />
                <div className="font-semibold text-blue-900">{t.name}</div>
              </div>
              <div className="text-sm mt-1 text-blue-700/80">Kategori: {t.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const TenantDetail = ({ tenantId, onAddCart, canBuy }) => {
  const tenant = useMemo(() => TENANTS.find((t) => t.id === tenantId), [tenantId]);
  if (!tenant) return <div className="max-w-6xl mx-auto px-4 py-8">Tenant tidak ditemukan.</div>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-xl overflow-hidden border border-blue-100">
        <img src={tenant.photo} alt={tenant.name} className="w-full h-56 object-cover" />
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={tenant.icon} alt="icon" className="w-8 h-8" />
            <div>
              <div className="text-xl font-bold text-blue-900">{tenant.name}</div>
              <div className="text-sm text-blue-700/80">{tenant.category}</div>
            </div>
          </div>
          <button onClick={() => window.history.back()} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Kembali</button>
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-blue-800">Menu</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {tenant.menus.map((m) => (
          <div key={m.id} className="bg-white border border-blue-100 rounded-xl overflow-hidden">
            <img src={m.photo} alt={m.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold text-blue-900">{m.name}</div>
              <div className="text-blue-700/90">{currency(m.price)}</div>
              <button
                disabled={!canBuy}
                onClick={() => onAddCart({ tenantId: tenant.id, tenantName: tenant.name, ...m, qty: 1 })}
                className={`mt-3 w-full px-3 py-2 rounded font-semibold transition ${canBuy ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300' : 'bg-blue-100 text-blue-400 cursor-not-allowed'}`}
              >
                Tambah ke Keranjang
              </button>
              {!canBuy && (
                <div className="text-xs text-blue-600 mt-2">Login sebagai Pembeli untuk menambahkan ke keranjang.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CartPage = ({ cart, setCart, onNavigate, canBuy }) => {
  // Selection for checkout
  const [selected, setSelected] = useState(() => new Set(cart.map((c) => c.id)));
  useEffect(() => {
    setSelected(new Set(cart.map((c) => c.id)));
  }, [cart]);

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const updateQty = (id, delta) => {
    const next = cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
    setCart(next);
  };

  const removeItem = (id) => setCart(cart.filter((c) => c.id !== id));

  const total = cart.reduce((sum, c) => (selected.has(c.id) ? sum + c.price * c.qty : sum), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-blue-900">Keranjang</h2>
      {!canBuy && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">Hanya Pembeli yang dapat menggunakan keranjang.</div>
      )}
      {cart.length === 0 ? (
        <div className="mt-6 text-blue-700">Keranjang kosong.</div>
      ) : (
        <div className="mt-4 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl p-3">
                <input type="checkbox" className="w-4 h-4" checked={selected.has(c.id)} onChange={() => toggle(c.id)} />
                <img src={c.photo} alt={c.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-semibold text-blue-900">{c.name}</div>
                  <div className="text-sm text-blue-700/80">{c.tenantName}</div>
                  <div className="text-sm">{currency(c.price)} x {c.qty} = <span className="font-semibold">{currency(c.price * c.qty)}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(c.id, -1)} className="px-2 py-1 bg-blue-100 rounded">-</button>
                  <button onClick={() => updateQty(c.id, +1)} className="px-2 py-1 bg-blue-100 rounded">+</button>
                  <button onClick={() => removeItem(c.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Hapus</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 h-fit">
            <div className="font-semibold text-blue-900">Ringkasan</div>
            <div className="mt-2 flex items-center justify-between">
              <span>Total</span>
              <span className="font-bold">{currency(total)}</span>
            </div>
            <button
              disabled={!canBuy || total === 0}
              onClick={() => onNavigate(`/checkout?ids=${encodeURIComponent(Array.from(selected).join(','))}`)}
              className={`mt-4 w-full px-3 py-2 rounded font-semibold transition ${!canBuy || total === 0 ? 'bg-blue-100 text-blue-400 cursor-not-allowed' : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'}`}
            >
              Lanjut ke Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = ({ cart, setCart, onNavigate, canBuy }) => {
  const params = new URLSearchParams((window.location.hash.split('?')[1] || ''));
  const ids = (params.get('ids') || '').split(',').filter(Boolean);
  const items = cart.filter((c) => ids.includes(c.id));
  const [showQR, setShowQR] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  const total = items.reduce((s, c) => s + c.price * c.qty, 0);

  useEffect(() => {
    if (!canBuy) onNavigate('/auth');
  }, [canBuy, onNavigate]);

  const pay = () => {
    if (!form.name || !form.phone) {
      alert('Isi data diri terlebih dahulu.');
      return;
    }
    setShowQR(true);
    setTimeout(() => {
      const orderNo = 'FT-' + Math.floor(Math.random() * 900000 + 100000);
      // Remove purchased items from cart
      const remain = cart.filter((c) => !ids.includes(c.id));
      setCart(remain);
      onNavigate(`/success?order=${orderNo}`);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-blue-900">Checkout</h2>
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 bg-white border border-blue-100 rounded-xl p-4">
          <div className="font-semibold text-blue-800 mb-2">Ringkasan Pesanan</div>
          {items.length === 0 ? (
            <div className="text-blue-700">Tidak ada item yang dipilih.</div>
          ) : (
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.photo} alt={it.name} className="w-14 h-14 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900">{it.name}</div>
                    <div className="text-sm text-blue-700/80">{it.tenantName}</div>
                  </div>
                  <div className="text-sm">{it.qty} x {currency(it.price)}</div>
                  <div className="font-semibold">{currency(it.qty * it.price)}</div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-blue-100 pt-3 mt-2">
                <div className="font-semibold">Total</div>
                <div className="font-bold text-blue-900">{currency(total)}</div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 h-fit">
          <div className="font-semibold text-blue-800 mb-2">Data Diri</div>
          <div className="space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama" className="w-full px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="No. Telepon" className="w-full px-3 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <button disabled={!canBuy || items.length === 0} onClick={pay} className={`w-full px-3 py-2 rounded font-semibold transition ${!canBuy || items.length === 0 ? 'bg-blue-100 text-blue-400 cursor-not-allowed' : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'}`}>Bayar</button>
            {showQR && (
              <div className="text-center mt-2">
                <div className="text-sm text-blue-700 mb-2">Scan QR untuk membayar</div>
                <img src="https://placehold.co/180x180?text=QR" alt="QR" className="mx-auto" />
                <div className="text-xs text-blue-700/80 mt-2">Memproses pembayaran...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  const params = new URLSearchParams((window.location.hash.split('?')[1] || ''));
  const order = params.get('order');
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl">🎉</div>
      <h2 className="mt-4 text-2xl font-extrabold text-blue-900">Pesanan Berhasil!</h2>
      <p className="mt-2 text-blue-700">Nomor order kamu:</p>
      <div className="mt-2 text-3xl font-black text-yellow-500">{order || 'FT-XXXXXX'}</div>
      <button onClick={() => (window.location.hash = '/')} className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Kembali ke Beranda</button>
    </div>
  );
};

const AuthPage = ({ onLogin }) => {
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [reg, setReg] = useState({ name: '', email: '', password: '', role: 'pembeli' });

  const submitLogin = (e) => {
    e.preventDefault();
    // Dummy validation
    if (!login.email || !login.password) return alert('Lengkapi email & password');
    const role = localStorage.getItem('wec_last_role') || 'pembeli';
    const user = { name: login.email.split('@')[0], email: login.email, role };
    onLogin(user);
  };

  const submitReg = (e) => {
    e.preventDefault();
    if (!reg.name || !reg.email || !reg.password) return alert('Lengkapi form');
    localStorage.setItem('wec_last_role', reg.role);
    const user = { name: reg.name, email: reg.email, role: reg.role };
    onLogin(user);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white border border-blue-100 rounded-xl overflow-hidden">
        <div className="flex">
          <button onClick={() => setTab('login')} className={`flex-1 py-3 font-semibold ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}>Login</button>
          <button onClick={() => setTab('register')} className={`flex-1 py-3 font-semibold ${tab === 'register' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}>Registrasi</button>
        </div>
        {tab === 'login' ? (
          <form onSubmit={submitLogin} className="p-4 space-y-3">
            <input value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 rounded border border-blue-200" />
            <input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder="Password" className="w-full px-3 py-2 rounded border border-blue-200" />
            <div className="text-xs text-blue-700/70">Catatan: role terakhir dari registrasi akan dipakai saat login.</div>
            <button type="submit" className="w-full px-3 py-2 rounded bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300">Masuk</button>
          </form>
        ) : (
          <form onSubmit={submitReg} className="p-4 space-y-3">
            <input value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} placeholder="Nama" className="w-full px-3 py-2 rounded border border-blue-200" />
            <input value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 rounded border border-blue-200" />
            <input type="password" value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} placeholder="Password" className="w-full px-3 py-2 rounded border border-blue-200" />
            <select value={reg.role} onChange={(e) => setReg({ ...reg, role: e.target.value })} className="w-full px-3 py-2 rounded border border-blue-200">
              <option value="pembeli">Pembeli</option>
              <option value="penjual">Penjual</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full px-3 py-2 rounded bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300">Daftar</button>
          </form>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [active, setActive] = useState('profil');
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Profil Pembeli</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="font-semibold text-blue-800 mb-2">Menu</div>
          <div className="flex md:block gap-2 md:gap-0">
            <button onClick={() => setActive('profil')} className={`w-full text-left px-3 py-2 rounded ${active==='profil'?'bg-blue-600 text-white':'hover:bg-blue-100'}`}>Profil</button>
            <button onClick={() => setActive('myorder')} className={`w-full text-left px-3 py-2 rounded ${active==='myorder'?'bg-blue-600 text-white':'hover:bg-blue-100'}`}>My Order</button>
            <button onClick={() => setActive('history')} className={`w-full text-left px-3 py-2 rounded ${active==='history'?'bg-blue-600 text-white':'hover:bg-blue-100'}`}>History Order</button>
          </div>
        </div>
        <div className="md:col-span-2 bg-white border border-blue-100 rounded-xl p-4 min-h-[200px]">
          {active === 'profil' && (
            <div>
              <div className="font-semibold text-blue-900 mb-2">Edit Profil</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Nama" className="px-3 py-2 rounded border border-blue-200" />
                <input placeholder="Email" className="px-3 py-2 rounded border border-blue-200" />
                <input placeholder="No. Telepon" className="px-3 py-2 rounded border border-blue-200" />
                <input placeholder="Alamat" className="px-3 py-2 rounded border border-blue-200" />
              </div>
              <button className="mt-3 px-4 py-2 rounded bg-yellow-400 text-blue-900 font-semibold">Simpan</button>
            </div>
          )}
          {active === 'myorder' && (
            <div>
              <div className="font-semibold text-blue-900 mb-2">My Order</div>
              <p className="text-blue-700/80 text-sm">Belum ada pesanan berjalan.</p>
            </div>
          )}
          {active === 'history' && (
            <div>
              <div className="font-semibold text-blue-900 mb-2">History Order</div>
              <p className="text-blue-700/80 text-sm">Riwayat pesanan akan tampil di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-center text-blue-900 font-semibold">Ini dashboard</div>
);

const Pages = ({ path, user, setUser, cart, setCart, onNavigate, setLoading }) => {
  const canBuy = user && user.role === 'pembeli';

  const addToCart = (item) => {
    if (!canBuy) return;
    const newItem = { ...item, id: `${item.id}-${Date.now()}` };
    const next = [...cart, newItem];
    setCart(next);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  // Guards
  useEffect(() => {
    if (path.startsWith('/cart') || path.startsWith('/checkout')) {
      if (!canBuy) onNavigate('/auth');
    }
    if ((user?.role === 'admin' || user?.role === 'penjual') && (path.startsWith('/cart') || path.startsWith('/checkout'))) {
      onNavigate('/dashboard');
    }
  }, [path, user, canBuy, onNavigate]);

  if (path === '/') return <Home onOpenTenant={(id) => onNavigate(`/tenant/${id}`)} />;

  if (path.startsWith('/tenant/')) {
    const tenantId = path.split('/')[2];
    return <TenantDetail tenantId={tenantId} onAddCart={addToCart} canBuy={canBuy} />;
  }

  if (path === '/cart') return <CartPage cart={cart} setCart={setCart} onNavigate={onNavigate} canBuy={canBuy} />;

  if (path.startsWith('/checkout')) return <CheckoutPage cart={cart} setCart={setCart} onNavigate={onNavigate} canBuy={canBuy} />;

  if (path.startsWith('/success')) return <SuccessPage />;

  if (path === '/auth') return <AuthPage onLogin={(u) => { setUser(u); onNavigate('/'); }} />;

  if (path === '/profile') return <ProfilePage />;

  if (path === '/dashboard') return <DashboardPage />;

  return <div className="max-w-3xl mx-auto px-4 py-16 text-blue-900">Halaman tidak ditemukan.</div>;
};

export default Pages;
