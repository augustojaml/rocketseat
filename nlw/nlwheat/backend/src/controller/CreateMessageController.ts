import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;
    const { user_id } = request;
    const service = new CreateMessageService();
    try {
      const result = await service.execute({
        user_id,
        text: message,
      });

      return response.json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }

    // console.log(message, user_id);
    // return response.send();
  }
}

export { CreateMessageController };
