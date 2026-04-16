const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

export const fetchAllMembers = async () => {
  const res = await fetch(`${API_URL}?action=getAll&token=${TOKEN}`);
  const result = await res.json();
  if (result.status === "success") {
    return result.data.filter((m) => m.wa && m.nama);
  }
  throw new Error(result.message);
};

export const postAction = async (payload) => {
  // Paksa WA jadi string biar JSON.stringify nggak ngubah jadi int
  const safePayload = {
    ...payload,
    wa: payload.wa ? String(payload.wa) : undefined,
    oldWa: payload.oldWa ? String(payload.oldWa) : undefined,
    token: TOKEN,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(safePayload),
  });
  return await res.json();
};

export const editMember = async (oldWa, newNama, newWa) => {
  return await postAction({
    action: "editMember",
    oldWa: oldWa,
    newNama: newNama,
    newWa: newWa,
  });
};
