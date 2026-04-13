import axiosClient from "../utils/axiosClient";

export async function listPropositionsAide() {
  try {
    return await axiosClient.get("/propositions-aide");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function updateStatutProposition(id, statut) {
  try {
    return await axiosClient.put(`/propositions-aide/${id}/statut`, { statut });
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
