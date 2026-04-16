import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ text = "MEMUAT DATA..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-400 animate-in fade-in duration-300">
      <Loader2
        className="animate-spin mb-4 text-blue-600"
        size={44}
        strokeWidth={2.5}
      />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {text}
      </p>
    </div>
  );
}
