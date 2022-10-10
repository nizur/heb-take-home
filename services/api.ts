import Axios from 'axios';
import { PlacedOrder } from '../types/pizza';

// NOTE: Paths: /auth for login; /orders/* for the rest

const api = Axios.create({
  baseURL: 'http://localhost:3000/api', // TEMP
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

export const fetchOrders = async ({ filter, property }): Promise<PlacedOrder[]> => {
  try {
    const { data: orders } = await api.get('/orders');
    return filterOrdersByPropertyValue({ orders, filter, property });
  } catch (e) {
    throw new Error('There was an error fetching your orders');
  }
};

export const deleteOrderById = async (id: string): Promise<PlacedOrder[]> => {
  try {
    const { data } = await api.delete(`/orders/${id}`);
    return data;
  } catch (e) {
    throw new Error('There was an error deleting your order');
  }
}

export const filterOrdersByPropertyValue = ({ orders, property, filter }): PlacedOrder[] => {
  if (!filter.length) {
    return orders;
  }

  return orders.filter((order: PlacedOrder) => {
    if (property === 'Table_No') {
      return order[property] === Number(filter);
    }

    // Standardize values before filtering
    const orderValue = order[property].toLowerCase();
    const fragment = filter.toLowerCase();

    return orderValue.includes(fragment);
  });
}
