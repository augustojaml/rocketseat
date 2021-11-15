/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = {
  show(err: any, type: 'error' | 'success') {
    if (err.response === undefined && typeof err !== 'string') {
      toast[type]('Connection failed. Try again later', {
        theme: 'colored',
      });
      return null;
    }

    if (typeof err === 'object') {
      const typeOfError = typeof err.response.data.message;
      if (typeOfError === 'object') {
        Object.entries(err.response.data.message).forEach(message => {
          const [_, value] = message;
          toast[type](value, {
            theme: 'colored',
          });
        });
      } else {
        toast[type](err.response.data.message, {
          theme: 'colored',
        });
      }
    } else {
      toast[type](err, {
        theme: 'colored',
      });
    }
  },
};

export { ToastMessage };
