import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.body.refreshToken || request.header['x-access-token'] || request.query.refreshToken;

    const useCase = container.resolve(RefreshTokenUseCase);
    const token = await useCase.execute(refreshToken);
    return response.json(token);
  }
}

export { RefreshTokenController };
