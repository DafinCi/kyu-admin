import React, { useState } from "react";
import { X, Save, AlertCircle } from "lucide-react";

export default function ModalAdd({ members, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formattedWa = wa.replace(/[^0-9]/g, "");
    const isDuplicate = members.some((m) => m.wa === formattedWa);

    if (isDuplicate) {
      setErrorMsg("Nomor WA ini sudah terdaftar di sistem!");
      return;
    }

    // ⚡ Langsung lempar ke parent (Dashboard) trus nutup modal instan!
    onAdd({ nama: name, wa: formattedWa });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">Tambah Member</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2 border border-red-100">
            <AlertCircle size={14} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Pelanggan"
          />
          <input
            type="text"
            inputMode="numeric"
            required
            value={wa}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setWa(onlyNumbers);
              setErrorMsg("");
            }}
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
            placeholder="Nomor WA (Cth: 0812345678)"
          />
          <button
            disabled={!name || !wa}
            className="w-full bg-blue-600 disabled:bg-blue-300 text-white p-4 rounded-2xl font-bold flex justify-center items-center gap-2 shadow-md hover:bg-blue-700 transition-all active:scale-95"
          >
            <Save size={18} /> Simpan Data
          </button>
        </form>
      </div>
    </div>
  );
}
