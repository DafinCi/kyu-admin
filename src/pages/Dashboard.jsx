import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Edit3,
  Trash2,
  Plus,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import * as api from "../api/adminApi";
import Navbar from "../components/Layout/Navbar";
import MemberListItem from "../components/Member/MemberListItem"; // Nama komponen diganti
import ModalAdd from "../components/UI/ModalAdd";
import ModalEdit from "../components/UI/ModalEdit";
import Loader from "../components/UI/Loader";

export default function Dashboard({ onLogout }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  // 1. Initial Load (Hanya dipanggil sekali saat buka aplikasi / tambah / hapus)
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.fetchAllMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ 2. THE OPTIMISTIC UPDATE LOGIC (Super Cepat, Tanpa Loading)
  const handleUpdatePoint = async (wa, currentPoint, isReady) => {
    if (isReady && !confirm("Yakin mau klaim reward dan reset poin ke 0?"))
      return;

    const newPoint = isReady ? 0 : currentPoint + 1;

    // A. Simpan data lama buat jaga-jaga kalau internet putus (Rollback)
    const previousMembers = [...members];

    // B. Ubah UI secara instan! Tanpa nunggu respon server
    setMembers((prev) =>
      prev.map((m) => (m.wa === wa ? { ...m, poin: newPoint } : m)),
    );

    // C. Getar dikit di HP (Haptic Feedback) biar ada sensasi "klik"
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    // D. Kirim ke Google Sheets di background
    try {
      await api.postAction({ action: "updatePoint", wa, newPoint });
      // Berhasil? Yaudah diam aja, UI udah berubah duluan.
    } catch (error) {
      // E. Kalau server gagal, kembalikan ke angka semula!
      console.error(error);
      setMembers(previousMembers);
      alert("⚠️ Gagal update poin! Cek koneksi internet.");
    }
  };

  // Delete & Add tetap pakai loadData() untuk memastikan urutan data aman
  const handleDelete = async (wa, nama) => {
    if (!confirm(`Hapus data ${nama} permanen?`)) return;
    try {
      await api.postAction({ action: "deleteMember", wa });
      loadData();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      (m.wa?.toString() || "").includes(search) ||
      (m.nama?.toLowerCase() || "").includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Navbar search={search} setSearch={setSearch} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto md:p-6">
        {loading ? (
          <Loader text="SINKRONISASI DATA..." />
        ) : (
          <>
            {/* 📱 MOBILE VIEW: Compact List View (Hemat Layar) */}
            <div className="md:hidden bg-white border-y border-slate-200">
              {filteredMembers.map((m, i) => (
                <MemberListItem
                  key={m.wa + i}
                  member={m}
                  onUpdate={handleUpdatePoint}
                  onDelete={handleDelete}
                  onEdit={() => {
                    setSelectedMember(m);
                    setModalType("edit");
                  }}
                />
              ))}
              {filteredMembers.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  Data tidak ditemukan.
                </div>
              )}
            </div>

            {/* 💻 DESKTOP VIEW: Data Table Tetap Sama */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              {/* ... (Isi table persis sama seperti diskusi sebelumnya) ... */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">Nama Pelanggan</th>
                      <th className="px-6 py-4 font-bold">Nomor WA</th>
                      <th className="px-6 py-4 font-bold text-center">Poin</th>
                      <th className="px-6 py-4 font-bold text-right sticky right-0 bg-slate-50 z-10">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((m, i) => {
                      const isReady = m.poin >= 9;
                      return (
                        <tr
                          key={m.wa + i}
                          className={`transition-colors hover:bg-slate-50 ${isReady ? "bg-emerald-50/50" : ""}`}
                        >
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-800">
                              {m.nama}
                            </span>
                            {isReady && (
                              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                <CheckCircle2 size={10} /> Reward Ready
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`https://wa.me/${m.wa.replace(/^0/, "62")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                            >
                              <MessageCircle size={14} /> {m.wa}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex w-8 h-8 items-center justify-center rounded-full font-black text-sm ${isReady ? "bg-emerald-500 text-white" : "bg-blue-100 text-blue-700"}`}
                            >
                              {m.poin}
                            </span>
                          </td>
                          <td className="px-6 py-4 sticky right-0 bg-white/80 backdrop-blur-sm shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)] text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedMember(m);
                                  setModalType("edit");
                                }}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(m.wa, m.nama)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                              <div className="w-px h-6 bg-slate-200 mx-1"></div>
                              <button
                                onClick={() =>
                                  handleUpdatePoint(m.wa, m.poin, isReady)
                                }
                                className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all min-w-[110px] ${isReady ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                              >
                                {isReady ? (
                                  "Klaim Reward"
                                ) : (
                                  <>
                                    <Plus size={14} /> 1 Poin
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* FAB Buat Tambah User */}
      <button
        onClick={() => setModalType("add")}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center z-40"
      >
        <UserPlus size={24} />
      </button>

      {modalType === "add" && (
        <ModalAdd
          members={members}
          onClose={() => setModalType(null)}
          onSuccess={loadData}
        />
      )}
      {modalType === "edit" && (
        <ModalEdit
          member={selectedMember}
          onClose={() => setModalType(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}
