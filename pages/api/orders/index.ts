import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'jsonfile';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PlacedOrder } from '../../../types/pizza';

const json = `${process.cwd()}/db/index.json`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders = await readFile(json) as PlacedOrder[];

  if (req.method === 'GET') { // Get orders
    res.status(200).json(orders);
  } else if (req.method === 'POST') { // Add an order
    const newOrder: PlacedOrder = {
      ...JSON.parse(req.body),
      Order_ID: uuidv4(),
      Timestamp: Date.now().toString()
    };
    orders.push(newOrder);
    await writeFile(json, orders);
    res.status(200).json(orders);
  } else {
    res.status(404);
  }
}
