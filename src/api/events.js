import axiosClient from "../utils/axiosClient";

export async function listEvents() {
  try {
    // ✅ backend route الصحيح: /evenements
    return await axiosClient.get("/evenements");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function getEventById(id) {
  try {
    return await axiosClient.get(`/evenements/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function createEvent(values) {
  try {
    return await axiosClient.post("/evenements", values);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function updateEvent(id, values) {
  try {
    return await axiosClient.put(`/evenements/${id}`, values);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function deleteEvent(id) {
  try {
    return await axiosClient.delete(`/evenements/${id}`);
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}