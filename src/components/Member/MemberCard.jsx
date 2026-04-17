// import {
//   Phone,
//   Trash2,
//   Plus,
//   Edit3,
//   Loader2,
//   MessageCircle,
//   Gift,
// } from "lucide-react";

// export default function MemberCard({
//   member,
//   onUpdate,
//   onDelete,
//   onEdit,
//   loadingWa,
// }) {
//   const isLoading = loadingWa === member.wa;
//   const isReady = member.poin >= 9;

//   return (
//     <div
//       className={`
//       p-5 rounded-[1.5rem] shadow-sm border flex flex-col gap-4 relative transition-all
//       ${isReady ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-100"}
//     `}
//     >
//       {/* Action Area Kanan Atas */}
//       <div className="absolute top-4 right-4 flex gap-2">
//         <button
//           onClick={onEdit}
//           className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
//         >
//           <Edit3 size={16} />
//         </button>
//         <button
//           onClick={() => onDelete(member.wa, member.nama)}
//           className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
//         >
//           <Trash2 size={16} />
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mt-1">
//         <div
//           className={`
//           w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm
//           ${isReady ? "bg-emerald-500 text-white animate-pulse" : "bg-blue-50 text-blue-600"}
//         `}
//         >
//           {member.poin}
//         </div>
//         <div className="pr-16">
//           <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
//             {member.nama}
//           </h3>
//           <a
//             href={`https://wa.me/${member.wa.replace(/^0/, "62")}`}
//             target="_blank"
//             rel="noreferrer"
//             className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-1 hover:text-emerald-600"
//           >
//             <MessageCircle size={12} /> {member.wa}
//           </a>
//         </div>
//       </div>

//       {/* Area Tombol */}
//       <div
//         className={`flex gap-2 pt-3 border-t ${isReady ? "border-emerald-100" : "border-slate-50"}`}
//       >
//         {!isReady && (
//           <button
//             disabled={isLoading}
//             onClick={() => onUpdate(member.wa, member.poin, true)} // isReset = true
//             className="px-4 py-3 bg-white text-slate-400 border border-slate-200 text-xs font-bold rounded-xl hover:bg-slate-50 hover:text-slate-600 flex-1"
//           >
//             Reset
//           </button>
//         )}
//         <button
//           disabled={isLoading}
//           onClick={() => onUpdate(member.wa, member.poin, isReady)}
//           className={`flex-[2] py-3 text-white text-xs font-bold rounded-xl shadow-md flex justify-center items-center gap-2 transition-all
//             ${isReady ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-900 hover:bg-slate-800"}
//           `}
//         >
//           {isLoading ? (
//             <Loader2 size={14} className="animate-spin" />
//           ) : isReady ? (
//             <>
//               <Gift size={14} /> Klaim Reward
//             </>
//           ) : (
//             <>
//               <Plus size={14} /> Tambah Poin
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }
