import { MoreVertical, Plus, Gift, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

export default function MemberListItem({ member, onUpdate, onDelete, onEdit }) {
  const isReady = member.poin >= 9;
  // State untuk toggle menu kecil di HP
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`relative flex items-center gap-3 p-4 border-b border-slate-100 transition-colors ${isReady ? "bg-emerald-50/30" : "bg-white"}`}
    >
      {/* 1. Avatar / Poin (Kiri) */}
      <div
        className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-sm ${isReady ? "bg-emerald-500 text-white animate-pulse" : "bg-blue-100 text-blue-700"}`}
      >
        {member.poin}
      </div>

      {/* 2. Informasi Nama & WA (Tengah) */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 text-sm truncate">
          {member.nama}
        </h3>
        <a
          href={`https://wa.me/${member.wa.replace(/^0/, "62")}`}
          target="_blank"
          rel="noreferrer"
          className={`text-xs font-medium truncate block mt-0.5 ${isReady ? "text-emerald-600" : "text-slate-500"}`}
        >
          {member.wa}
        </a>
      </div>

      {/* 3. Tombol Aksi Cepat (Kanan) */}
      <div className="flex items-center gap-1">
        {/* Tombol Utama (+ Poin atau Klaim) */}
        <button
          onClick={() => onUpdate(member.wa, member.poin, isReady)}
          className={`h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${isReady ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"}`}
        >
          {isReady ? (
            <>
              <Gift size={14} /> Klaim
            </>
          ) : (
            <>
              <Plus size={14} /> Poin
            </>
          )}
        </button>

        {/* Tombol Menu Tambahan (Titik Tiga) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 active:bg-slate-100 transition-colors"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* 4. Dropdown Menu Melayang (Muncul kalau titik tiga diklik) */}
      {showMenu && (
        <>
          {/* Overlay transparan biar pas klik di luar menu nutup */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          ></div>

          <div className="absolute right-4 top-14 mt-1 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setShowMenu(false);
                onEdit();
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-600 font-medium flex items-center gap-2 active:bg-slate-50"
            >
              <Edit3 size={16} /> Edit Data
            </button>
            <div className="w-full h-px bg-slate-100 my-1"></div>
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete(member.wa, member.nama);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-medium flex items-center gap-2 active:bg-red-50"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </>
      )}
    </div>
  );
}
