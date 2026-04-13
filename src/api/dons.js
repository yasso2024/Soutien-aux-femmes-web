import axiosClient from "../utils/axiosClient";

export async function listDons() {
  try {
    const response = await axiosClient.get("/dons");
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function createDon(values) {
  try {
    const response = await axiosClient.post("/dons", values);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message );
  }
}

export async function confirmerDon(id) {
  try {
    const response = await axiosClient.put(`/dons/${id}/confirm`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message );
  }
}

export async function deleteDon(id) {
  try {
    const response = await axiosClient.delete(`/dons/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message );
  }
}