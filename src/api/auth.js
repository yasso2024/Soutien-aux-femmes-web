import axiosClient from "../utils/axiosClient";

export async function authUser(values) {
  try {
    const response = await axiosClient.post("/auth/login", values);
    return response;

  } catch (error) {
   throw error(error.response.data.message);
  }
}