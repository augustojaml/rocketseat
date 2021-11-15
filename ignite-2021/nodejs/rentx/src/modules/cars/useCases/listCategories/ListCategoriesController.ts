import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';

class ListCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listCategory = container.resolve(ListCategoriesUseCase);
    const categories = await listCategory.execute();
    return response.status(201).json(categories);
  }
}

export { ListCategoriesController };
