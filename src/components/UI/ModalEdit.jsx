import React, { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { editMember } from "../../api/adminApi";

export default function ModalEdit({ member, onClose, onSuccess }) {
  const [name, setName] = useState(member.nama);
  const [wa, setWa] = useState(member.wa);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editMember(member.wa, name, wa);
      if (res.status === "success") {
        onSuccess();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-black mb-6">Edit Data Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full bg-slate-50 p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
          />
          <input
            type="text"
            inputMode="numeric"
            required
            value={wa}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setWa(onlyNumbers);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Cth: 0812345678"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-slate-500"
            >
              Batal
            </button>
            <button
              disabled={loading}
              className="flex-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={18} /> Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
