import { readFile, writeFile } from 'jsonfile';
import { NextApiRequest, NextApiResponse } from 'next';
import { PlacedOrder } from '../../../types/pizza';

const json = `${process.cwd()}/db/index.json`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let orders = await readFile(json) as PlacedOrder[];

  if (req.method === 'DELETE') {
    const { orderId } = req.query;
    orders = orders.filter((order) => order.Order_ID !== orderId);
    await writeFile(json, orders);
    res.status(200).json(orders);
  } else {
    res.status(404).json(orders);
  }
}
