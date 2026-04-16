import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import * as api from "../api/adminApi";
import Navbar from "../components/Layout/Navbar";
import MemberCard from "../components/Member/MemberCard";
import ModalAdd from "../components/UI/ModalAdd";
import ModalEdit from "../components/UI/ModalEdit"; // Baru
import Loader from "../components/UI/Loader";

export default function Dashboard({ onLogout }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [modalType, setModalType] = useState(null); // 'add' atau 'edit'
  const [selectedMember, setSelectedMember] = useState(null);

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

  const handleUpdatePoint = async (wa, currentPoint, isReset) => {
    const newPoint = isReset ? 0 : currentPoint + 1;
    if (isReset && !confirm("Reset poin ke 0?")) return;
    setActionLoading(wa);
    try {
      await api.postAction({ action: "updatePoint", wa, newPoint });
      loadData();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (wa, nama) => {
    if (!confirm(`Hapus ${nama}?`)) return;
    setActionLoading(wa);
    try {
      await api.postAction({ action: "deleteMember", wa });
      loadData();
    } finally {
      setActionLoading(null);
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

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <Loader text="SINKRONISASI DATA..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((m, i) => (
              <MemberCard
                key={m.wa + i}
                member={m}
                onUpdate={handleUpdatePoint}
                onDelete={handleDelete}
                onEdit={() => {
                  setSelectedMember(m);
                  setModalType("edit");
                }}
                loadingWa={actionLoading}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setModalType("add")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <UserPlus size={24} />
      </button>

      {modalType === "add" && (
        <ModalAdd onClose={() => setModalType(null)} onSuccess={loadData} />
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
