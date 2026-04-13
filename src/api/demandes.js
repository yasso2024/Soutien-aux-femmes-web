import axiosClient from "../utils/axiosClient";

export async function listDemandes() {
  try {
    const response = await axiosClient.get("/demandes");
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createDemande(values) {
  try {
    const response = await axiosClient.post("/demandes", values);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateStatutDemande(id, statut) {
  try {
    const response = await axiosClient.put(`/demandes/${id}/statut`, {
      statut
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getDemandeById(id) {
  try {
    const response = await axiosClient.get(`/demandes/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteDemande(id) {
  try {
    const response = await axiosClient.delete(`/demandes/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}