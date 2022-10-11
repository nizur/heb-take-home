import { screen, render } from '@testing-library/react';
import OrderCard from './OrderCard';
import { PlacedOrder } from '../../types/pizza';

const fakeOrder: PlacedOrder = {
  Flavor: 'Pepperoni',
  Crust: 'Regular',
  Size: 'Large',
  Table_No: 1,
  Order_ID: '123',
  Timestamp: '1294827394'
};

describe('OrderCard', () => {
  it('renders', () => {
    render(<OrderCard order={fakeOrder} />);
  });

  it('shows the correct order information', () => {
    render(<OrderCard order={fakeOrder} />);

    const img = screen.getByRole('img', { name: 'Pepperoni' }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pepperoni');

    const title = screen.getByText('Large Pepperoni');
    expect(title).toBeInTheDocument();

    const desc = screen.getByText('Large Pepperoni on Regular crust');
    expect(desc).toBeInTheDocument();

    const table = screen.getByText('Table #1');
    expect(table).toBeInTheDocument();
  });
});
