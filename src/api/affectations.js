import axiosClient from "../utils/axiosClient";

export async function listAffectations() {
  try {
    return await axiosClient.get("/affectations");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function createAffectation(data) {
  try {
    return await axiosClient.post("/affectations", data);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function updateAffectation(id, data) {
  try {
    return await axiosClient.put(`/affectations/${id}`, data);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function deleteAffectation(id) {
  try {
    return await axiosClient.delete(`/affectations/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function listActionsSolidaires() {
  try {
    return await axiosClient.get("/actions-solidaires");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
