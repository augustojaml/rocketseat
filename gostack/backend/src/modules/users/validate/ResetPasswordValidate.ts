import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { IResetPasswordDTO } from '../dtos/IResetPasswordDTO';

const ResetPasswordValidate = {
  async handle({ old_password, new_password, confirm_password }: IResetPasswordDTO) {
    try {
      const schema = YUP.object().shape({
        old_password: YUP.string().required('Old password required'),
        new_password: YUP.string().required('New password required'),
        confirm_password: YUP.string().oneOf([YUP.ref('new_password'), 'null'], 'Confirmation password incorrect'),
      });
      await schema.validate({ old_password, new_password, confirm_password }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { ResetPasswordValidate };
