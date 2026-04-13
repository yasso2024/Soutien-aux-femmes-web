import axiosClient from "../utils/axiosClient";

export async function loginUser(values) {
  try {
    const response = await axiosClient.post("/auth/login", values);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function signUpUser(values) {
  try {
    const response = await axiosClient.post("/auth/signup", values);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function changePassword(values) {
  try {
    return await axiosClient.put("/auth/change-password", values);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function forgotPassword(email) {
  try {
    return await axiosClient.post("/auth/forgot-password", { email });
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function resetPassword(token, values) {
  try {
    return await axiosClient.put(`/auth/reset-password/${token}`, values);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getMe() {
  try {
    return await axiosClient.get("/auth/me");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}