import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordValidate } from '@modules/users/validate/ResetPasswordValidate';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { new_password, confirm_password } = request.body;

    await ResetPasswordValidate.handle({ new_password, confirm_password });

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      user_id,
      new_password,
    });

    return response.send();
  }
}

export { ResetPasswordController };
