import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCase';

class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.header['x-access-token'] || request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);

    return response.json(refreshToken);
  }
}

export { RefreshTokenController };
