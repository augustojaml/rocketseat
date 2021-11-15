import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO';

const AuthenticateUserValidade = {
  async handle({ email, password }: IAuthenticateUserDTO) {
    try {
      const schema = YUP.object().shape({
        email: YUP.string().email('E-mail invalid').required('Name required'),
        password: YUP.string().required('Password required'),
      });
      await schema.validate({ email, password }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { AuthenticateUserValidade };
