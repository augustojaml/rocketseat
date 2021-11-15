import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesUseCase } from '@modules/cars/useCases/importCategory/ImportCategoriesUseCase';

class ImportCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const importCategories = container.resolve(ImportCategoriesUseCase);
    await importCategories.execute(file);
    return response.send();
  }
}

export { ImportCategoriesController };
