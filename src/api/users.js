import axiosClient from "../utils/axiosClient";
import { format } from "date-fns";

// création user
export async function createUser(values, avatarFilename) {
  try {
    const payload = {
      ...values,
      dob: values.dob ? format(values.dob, "yyyy-MM-dd") : undefined,
      avatar: avatarFilename,
    };

    const response = await axiosClient.post("/user/create", payload);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Create user failed");
  }
}

// liste complète des users
export async function listUsers() {
  try {
    return await axiosClient.get("/user");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Fetch users failed");
  }
}

// UPDATE USER
export async function updateUser(id, values) {
  try {
    const payload = {
      ...values,
      dob: values.dob ? format(values.dob, "yyyy-MM-dd") : undefined,
    };

    const response = await axiosClient.put("/user/update/" + id, payload);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Update user failed");
  }
}

// get one user
export async function getUserById(id) {
  try {
    const response = await axiosClient.get(`/user/${id}`);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message || "Fetch user failed");
  }
}

export async function listBenevoles() {
  try {
    return await axiosClient.get("/user?role=BENEVOLE");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function savePlayerID(playerId) {
  try {
    return await axiosClient.put('/user/player-id', { playerId });
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function listFemmes() {
  try {
    return await axiosClient.get("/user?role=FEMME%20MALADE");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function listAssociations() {
  try {
    return await axiosClient.get("/user?role=ASSOCIATION");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function listDonateurs() {
  try {
    return await axiosClient.get("/user?role=DONTEUR");
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}