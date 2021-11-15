import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

const CreateUserValidade = {
  async handle({ name, email, password, isHairdresser }: ICreateUserDTO) {
    try {
      const schema = YUP.object().shape({
        name: YUP.string().required('Name required'),
        email: YUP.string().email('E-mail invalid').required('E-mail required'),
        password: YUP.string().required('Password required'),
        isHairdresser: YUP.boolean().required('Hairdresser required'),
      });
      await schema.validate({ name, email, password, isHairdresser }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { CreateUserValidade };
