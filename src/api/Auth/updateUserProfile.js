import ErrorToast from "../../components/toast/ErrorToast";
import SuccessToast from "../../components/toast/SuccessToast";
import { api } from "../axiosInstance";

export const updateAdminProfile = async (payload) => {
  console.log("updatePayload", payload);
  try {
    const response = await api.put(
      `/admin/adminUpdate/${payload?.adminId}`,
      payload
    );
    const successMsg = response.data.message;
    SuccessToast(successMsg);
    console.log("response", response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    ErrorToast(errorMessage);
  }
};
