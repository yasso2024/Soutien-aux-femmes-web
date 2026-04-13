import axiosClient from "../utils/axiosClient";

export async function getLogs() {
  try {
    const response = await axiosClient.get("/logs/");
    return response;

  } catch (error) {
    throw new Error(error.response.data.message);
  }
}