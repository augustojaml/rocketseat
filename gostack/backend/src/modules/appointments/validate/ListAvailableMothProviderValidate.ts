import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

import { IListAvailableMothProviderDTO } from '../dtos/IListAvailableMothProviderDTO';

const ListAvailableMothProviderValidate = {
  async handle({ provider_id, month, year }: IListAvailableMothProviderDTO) {
    try {
      const schema = YUP.object().shape({
        provider_id: YUP.string().required('Provider required'),
        month: YUP.date().required('Month required'),
        year: YUP.date().required('Year required'),
      });
      await schema.validate({ provider_id, month, year }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { ListAvailableMothProviderValidate };
