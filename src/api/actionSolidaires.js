import axiosClient from "../utils/axiosClient";

export async function listActionsSolidaires() {
  try {
    return await axiosClient.get("/actions-solidaires");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function changeActionStatut(id, statut) {
  try {
    return await axiosClient.put(`/actions-solidaires/${id}/statut`, { statut });
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function deleteActionSolidaire(id) {
  try {
    return await axiosClient.delete(`/actions-solidaires/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
