import React from "react";
import { Search, LogOut } from "lucide-react";

export default function Navbar({ search, setSearch }) {
  const handleLogout = () => {
    if (confirm("Yakin mau keluar?")) {
      window.location.reload(); // Cara simpel hapus state auth
    }
  };

  return (
    <div className="bg-white px-6 md:px-10 pt-8 pb-6 shadow-sm border-b border-slate-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center justify-between md:justify-start gap-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Data Poin
            </h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
              Kyu Services Admin
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden p-3 bg-slate-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau nomor WA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white"
            />
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:flex p-3.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-colors items-center gap-2 font-bold text-sm"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
