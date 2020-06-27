import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

routes.post(
  '/points',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
        whatsapp: Joi.string(),
        latitude: Joi.string(),
        longitude: Joi.string(),
        city: Joi.string(),
        uf: Joi.string(),
        selectedItems: Joi.object(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;
