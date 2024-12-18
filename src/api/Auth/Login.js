import { api } from "../axiosInstance";
import SuccessToast from "../../components/toast/SuccessToast";
import ErrorToast from "../../components/toast/ErrorToast";

export const LoginAuth = async (payload) => {
  try {
    const response = await api.post("/admin/adminLogin", payload);
    const successMessage = response?.data?.message;
    SuccessToast(successMessage);
    localStorage.setItem("token", response.data.token);

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    ErrorToast(errorMessage);
  }
};
