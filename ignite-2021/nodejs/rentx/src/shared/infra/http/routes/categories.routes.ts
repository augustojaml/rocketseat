import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/useCases/importCategory/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureIsAdmin } from '@shared/infra/http/middleware/ensureIsAdmin';
import { ensureIsAuthenticated } from '@shared/infra/http/middleware/ensureIsAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './storage/file',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post('/', ensureIsAuthenticated, ensureIsAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), ensureIsAuthenticated, ensureIsAdmin, importCategoriesController.handle);

export { categoriesRoutes };
