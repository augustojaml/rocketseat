import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RecoverPasswordValidate } from '@modules/users/validate/RecoverPasswordValidate';

import { RecoverPasswordUseCase } from './RecoverPasswordUseCase';

class RecoverPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { new_password, confirm_password } = request.body;

    await RecoverPasswordValidate.handle({ new_password, confirm_password });

    const recoverPasswordUseCase = container.resolve(RecoverPasswordUseCase);

    await recoverPasswordUseCase.execute({
      token: String(token),
      new_password: new_password,
      confirm_password: confirm_password,
    });

    return response.send();
  }
}

export { RecoverPasswordController };
