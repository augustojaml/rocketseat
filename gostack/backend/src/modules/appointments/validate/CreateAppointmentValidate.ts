import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';

const CreateAppointmentValidate = {
  async handle({ user_id, provider_id, date }: ICreateAppointmentDTO) {
    try {
      const schema = YUP.object().shape({
        user_id: YUP.string().required('User id required'),
        provider_id: YUP.string().required('Provider required'),
        date: YUP.date().required('Password required'),
      });
      await schema.validate({ user_id, provider_id, date }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { CreateAppointmentValidate };
