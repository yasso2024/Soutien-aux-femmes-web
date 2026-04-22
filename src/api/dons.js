import axiosClient from "../utils/axiosClient";

export async function listDons() {
  try {
    return await axiosClient.get("/dons");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function createDon(values) {
  try {
    return await axiosClient.post("/dons", values);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function confirmerDon(id) {
  try {
    return await axiosClient.put(`/dons/${id}/confirm`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function refuserDon(id) {
  try {
    return await axiosClient.put(`/dons/${id}/statut`, { statut: "REFUSE" });
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function deleteDon(id) {
  try {
    return await axiosClient.delete(`/dons/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}