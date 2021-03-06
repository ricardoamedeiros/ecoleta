import { Request, Response } from 'express';
import knex from '../database/connection';
import ItemsController from './ItemsController';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      //    .where('city', String(city))
      //    .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://34.125.177.217/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://34.125.177.217/uploads/${point.image}`,
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    const avaliacoes = await knex('avaliacao')
      .where('avaliacao.point_id', id)
      .select('avaliacao.*');

    return response.json({ point: serializedPoint, items, avaliacoes });
  }

  async createAvaliacao(request: Request, response: Response) {
    console.log(request.body)
    const {
      name,
      descricao,
      rating,
      point_id
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      name,
      descricao,
      rating,
      point_id
    };

    const insertedIds = await trx('avaliacao').insert(point);

    await trx.commit();

    return response.json(insertedIds);
  }

  async create(request: Request, response: Response) {
    console.log(request.body)
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      selectedItems,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: '3c04d3d22308-market.jpeg',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];



    const pointItems = {
      item_id: selectedItems,
      point_id,
    };

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
