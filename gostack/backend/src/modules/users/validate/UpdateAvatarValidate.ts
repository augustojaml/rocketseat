import * as YUP from 'yup';

import { AppError } from '@shared/infra/middlewares/errors/AppError';
import { FormatErrorsSuporte } from '@support/FormatErrorsSuporte';

const UpdateAvatarValidate = {
  async handle(avatar_file: string) {
    try {
      const schema = YUP.object().shape({
        avatar_file: YUP.mixed().required('File is required'),
      });
      await schema.validate({ avatar_file }, { abortEarly: false });
    } catch (err) {
      throw new AppError(FormatErrorsSuporte.format(err));
    }
  },
};

export { UpdateAvatarValidate };
