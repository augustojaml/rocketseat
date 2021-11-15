import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { IRecoverPasswordWithTokenDTO } from '../dtos/IRecoverPasswordWithTokenDTO';

const RecoverPasswordValidate = {
  async handle({ new_password, confirm_password }: IRecoverPasswordWithTokenDTO) {
    try {
      const schema = YUP.object().shape({
        new_password: YUP.string().required('New password required'),
        confirm_password: YUP.string().oneOf([YUP.ref('new_password'), 'null'], 'Confirmation password incorrect'),
      });
      await schema.validate({ new_password, confirm_password }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { RecoverPasswordValidate };
