import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE;

export default function Login({ onLogin }) {
  const [passInput, setPassInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passInput === PASSCODE) {
      onLogin();
    } else {
      alert("Passcode Salah! Coba lagi bro.");
      setPassInput("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl text-center border border-slate-100 animate-in fade-in zoom-in duration-300"
      >
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">Kyu Admin</h1>
        <p className="text-slate-500 text-sm mb-8 font-medium">
          Masukkan Passcode Rahasia
        </p>
        <input
          type="password"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 transition-all"
          placeholder="••••••"
          autoFocus
        />

        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-md">
          Masuk Dashboard
        </button>
      </form>
    </div>
  );
}
