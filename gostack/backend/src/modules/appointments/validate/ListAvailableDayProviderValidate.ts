import * as YUP from 'yup';

import { IListAvailableDayProviderDTO } from '@modules/appointments/dtos/ListAvailableDayProviderDTO';
import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

const ListAvailableDayProviderValidate = {
  async handle({ provider_id, day, month, year }: IListAvailableDayProviderDTO) {
    try {
      const schema = YUP.object().shape({
        provider_id: YUP.string().required('Provider required'),
        day: YUP.date().required('Day required'),
        month: YUP.date().required('Month required'),
        year: YUP.date().required('Year required'),
      });
      await schema.validate({ provider_id, day, month, year }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { ListAvailableDayProviderValidate };
