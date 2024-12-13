import { Slide, toast } from "react-toastify";

export const ErrorToast = (errorMessage) => {
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
  });
};

export default ErrorToast;
