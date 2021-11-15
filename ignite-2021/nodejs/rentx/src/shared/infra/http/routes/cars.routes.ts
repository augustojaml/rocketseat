import { Router } from 'express';
import multer from 'multer';

import { uploadFile } from '@config/files';
import { storage } from '@config/storage';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureIsAdmin } from '@shared/infra/http/middleware/ensureIsAdmin';
import { ensureIsAuthenticated } from '@shared/infra/http/middleware/ensureIsAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadFile(storage.storage));

carsRoutes.post('/', ensureIsAuthenticated, ensureIsAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', ensureIsAuthenticated, ensureIsAdmin, createCarSpecificationsController.handle);

carsRoutes.post('/images/:id', ensureIsAuthenticated, ensureIsAdmin, upload.array('images'), uploadCarImagesController.handle);

export { carsRoutes };
