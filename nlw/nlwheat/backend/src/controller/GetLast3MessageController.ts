import { Request, Response } from 'express';
import { GetLast3MessageService } from '../services/GetLast3MessageService';

class GetLast3MessageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = new GetLast3MessageService();
    const last3Message = await service.execute();
    return response.json(last3Message);
  }
}

export { GetLast3MessageController };
