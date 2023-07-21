// hooks/useToast.js
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showWarning = (message: string) => {
    toast.warning(message);
  };

  return { showSuccess, showError, showWarning };
};

export default useToast;
