import React, { useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { postAction } from "../../api/adminApi";

export default function ModalAdd({ onClose, onSuccess, setGlobalLoading }) {
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !wa) return alert("Isi semua data dulu bro!");

    setLoading(true);
    try {
      const res = await postAction({
        action: "addMember",
        nama: name,
        wa: wa,
      });

      if (res.status === "success") {
        onSuccess(); // Refresh data di App.jsx
        onClose(); // Tutup modal
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Gagal koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-black text-slate-800 mb-1">Member Baru</h2>
        <p className="text-xs text-slate-500 mb-8 font-medium">
          Daftarkan pelanggan ke sistem Kyu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white transition-all"
              placeholder="Cth: Ahmad Zaelani"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              inputMode="numeric"
              required
              value={wa}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                setWa(onlyNumbers);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white transition-all"
              placeholder="0812xxxx"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <UserPlus size={18} /> Simpan Member
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
