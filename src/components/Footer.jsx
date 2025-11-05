import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-50 border-t border-blue-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 text-blue-900">
        <div>
          <div className="flex items-center gap-2 font-semibold text-blue-700">
            <span className="text-xl">🦁</span>
            <span>Web e-canteen FT</span>
          </div>
          <p className="text-sm mt-2 text-blue-700/80">Prototype kantin online untuk memudahkan pemesanan makanan dan minuman di lingkungan Fakultas Teknik.</p>
        </div>
        <div>
          <div className="font-semibold text-blue-700">Tautan</div>
          <ul className="text-sm mt-2 space-y-1">
            <li><a className="hover:underline" href="#">Tentang</a></li>
            <li><a className="hover:underline" href="#">Kebijakan Privasi</a></li>
            <li><a className="hover:underline" href="#">Bantuan</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-blue-700">Kontak</div>
          <p className="text-sm mt-2">Email: support@ecanteen.ft</p>
          <p className="text-sm">Tel: +62 812-3456-7890</p>
        </div>
      </div>
      <div className="text-center text-xs text-blue-700/70 py-3 bg-blue-100">© {new Date().getFullYear()} Web e-canteen FT. Semua hak dilindungi.</div>
    </footer>
  );
};

export default Footer;
