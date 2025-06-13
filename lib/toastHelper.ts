import { toast } from "react-hot-toast";

export const showSuccess = (message: string = "Action successful!") => {
  toast.success(message);
};

export const showError = (message: string = "Something went wrong.") => {
  toast.error(message);
};

export const showInfo = (message: string) => {
  toast.error(message);
};

export const showWarning = (message: string) => {
  toast.error(message);
};
