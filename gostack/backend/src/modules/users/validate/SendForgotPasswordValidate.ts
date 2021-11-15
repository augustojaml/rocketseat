import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

const SendForgotPasswordValidate = {
  async handle(email: string) {
    try {
      const schema = YUP.object().shape({
        email: YUP.string().email('E-mail invalid').required('Email required'),
      });
      await schema.validate({ email }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { SendForgotPasswordValidate };
