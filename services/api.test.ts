import { rest } from 'msw';
import { setupServer } from 'msw/node';
import api, {
  fetchOrders,
  filterOrdersByPropertyValue,
  deleteOrderById,
  postNewOrder
} from './api';
import { Order, PlacedOrder } from '../types/pizza';

const fakeOrders: PlacedOrder[] = [
  {
    Flavor: 'Pepperoni',
    Crust: 'Deep Dish',
    Size: 'Large',
    Table_No: 1,
    Order_ID: '123',
    Timestamp: '2342934827934'
  },
  {
    Flavor: 'Meat Lovers',
    Crust: 'Gluten Free',
    Size: 'Medium',
    Table_No: 2,
    Order_ID: '124',
    Timestamp: '2342132842934'
  },
  {
    Flavor: 'Pepperoni',
    Crust: 'Deep Dish',
    Size: 'Small',
    Table_No: 3,
    Order_ID: '125',
    Timestamp: '1834791293472'
  }
];

// NOTE: We're not testing the API itself here, just the API service. Setting 
// up the server to return failures on GET/DELETE. It's explained why further 
// down.
const server = setupServer(
  rest.post(`${api.defaults.baseURL}/orders`, (_, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.get(`${api.defaults.baseURL}/orders`, (_, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.delete(`${api.defaults.baseURL}/orders/:orderId`, (_, res, ctx) => {
    return res(ctx.status(400));
  })
);

describe('The API service', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('filterOrdersByPropertyValue', () => {
    it('returns all orders if no filter is given', () => {
      const orders = filterOrdersByPropertyValue({
        orders: fakeOrders,
        filter: '',
        property: 'Flavor'
      });

      expect(orders).toEqual(fakeOrders);
      expect(orders.length).toBe(3);
    });

    it('returns filtered orders correctly based on given property and filter', () => {
      const pepOrders = filterOrdersByPropertyValue({
        orders: fakeOrders,
        filter: 'Pep',
        property: 'Flavor'
      });

      expect(pepOrders.length).toBe(2);
      expect(pepOrders.every(order => order.Flavor === 'Pepperoni')).toBe(true);

      const deepDishOrders = filterOrdersByPropertyValue({
        orders: fakeOrders,
        filter: 'deep',
        property: 'Crust'
      });

      expect(deepDishOrders.length).toBe(2);
      expect(deepDishOrders.every(order => order.Crust === 'Deep Dish')).toBe(true);

      const noOrders = filterOrdersByPropertyValue({
        orders: fakeOrders,
        filter: 'not real',
        property: 'Size'
      });

      expect(noOrders.length).toBe(0);
    });
  });

  // NOTE: fetchOrders uses filterOrdersByPropertyValue, so there's no need to 
  // basically run the same tests as above on a good response. So let's test 
  // failures.
  describe('fetchOrders', () => {
    it('throws expected error on failure', async () => {
      await expect(fetchOrders({ property: 'Flavor', filter: '' }))
        .rejects
        .toThrow('There was an error fetching your orders');
    });
  });

  // NOTE: postNewOrder just calls API POST. We're not testing that here,
  // so let's make sure it throws on failure.
  describe('postNewOrder', () => {
    it('throws expected error on failure', async () => {
      const fakeOrder: Order = {
        Flavor: 'Pepperoni',
        Crust: 'Regular',
        Size: 'Large',
        Table_No: 1
      };

      await expect(postNewOrder(fakeOrder))
        .rejects
        .toThrow('There was an error placing your order');
    });
  });

  // NOTE: deleteOrderById just calls API DELETE. We're not testing that here,
  // so let's make sure it throws on failure.
  describe('deleteOrderById', () => {
    it('throws expected error on failure', async () => {
      await expect(deleteOrderById('111'))
        .rejects
        .toThrow('There was an error deleting your order');
    });
  });
});
