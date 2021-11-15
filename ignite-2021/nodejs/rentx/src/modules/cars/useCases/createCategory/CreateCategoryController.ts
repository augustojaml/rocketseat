import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createCategory = container.resolve(CreateCategoryUseCase);
    const category = await createCategory.execute({ name, description });
    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
