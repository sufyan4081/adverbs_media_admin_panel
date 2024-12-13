import { api } from "../axiosInstance";
import SuccessToast from "../../components/toast/SuccessToast";
import ErrorToast from "../../components/toast/ErrorToast";

export const fetchUser = async () => {
  try {
    const response = await api.get("/users/getAllUsers");

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
  }
};

export const deleteUser = async (payload) => {
  try {
    const response = await api.delete(`/users/deleteUser/${payload}`);
    const successMessage = response?.data?.message;
    SuccessToast(successMessage);

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    ErrorToast(errorMessage);
  }
};
