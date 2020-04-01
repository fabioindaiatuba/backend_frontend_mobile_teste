import { Router } from 'express';

import ProductController from './app/controllers/ProductController';
import BarcodeController from './app/controllers/BarcodeController';
import ReadingController from './app/controllers/ReadingController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.delete('/products/:id', ProductController.delete);

routes.post('/barcodes', BarcodeController.store);
routes.get('/barcodes', BarcodeController.show);

routes.get('/readings/:device', ReadingController.show);
routes.get('/readings/products/:product_id', ReadingController.index);
routes.post('/readings', ReadingController.store);

export default routes;
