import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordValidate } from '@modules/users/validate/SendForgotPasswordValidate';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await SendForgotPasswordValidate.handle(email);

    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMailUseCase);
    await sendForgotPasswordMail.execute(email);
    return response.send();
  }
}

export { SendForgotPasswordMailController };
