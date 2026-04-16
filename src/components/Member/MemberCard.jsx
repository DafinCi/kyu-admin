import { Phone, Trash2, RotateCcw, Plus, Edit3, Loader2 } from "lucide-react";

export default function MemberCard({
  member,
  onUpdate,
  onDelete,
  onEdit,
  loadingWa,
}) {
  const isLoading = loadingWa === member.wa;

  return (
    <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-lg transition-all group relative">
      <button
        onClick={onEdit}
        className="text-slate-300 hover:text-blue-500 transition-colors"
      >
        <Edit3 size={16} />
      </button>
      <button
        onClick={() => onDelete(member.wa, member.nama)}
        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-center gap-4 mt-2">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
          {member.poin}
        </div>
        <div className="pr-6">
          <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
            {member.nama}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-1">
            <Phone size={12} /> {member.wa}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-50">
        <button
          disabled={isLoading}
          onClick={() => onUpdate(member.wa, member.poin, true)}
          className="flex-1 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-xl hover:bg-red-50"
        >
          Reset
        </button>
        <button
          disabled={isLoading}
          onClick={() => onUpdate(member.wa, member.poin)}
          className="flex-1 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              <Plus size={14} /> +1 Poin
            </>
          )}
        </button>
      </div>
    </div>
  );
}
