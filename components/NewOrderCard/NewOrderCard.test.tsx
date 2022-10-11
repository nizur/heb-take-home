import { screen, render } from '@testing-library/react';
import NewOrderCard, { NewOrderCardProps } from './NewOrderCard';
import { Order } from '../../types/pizza';

const onCancel = jest.fn();
const onUpdate = jest.fn();
const fakeOrder: Order = {
  Flavor: 'Pepperoni',
  Crust: 'Regular',
  Size: 'Large',
  Table_No: 1,
};

const fakeProps: NewOrderCardProps = {
  id: '0',
  order: fakeOrder,
  onCancel,
  onUpdate
};

// NOTE: Not going to test all of the select fields since RTL doesn't make it 
// easy and I'm running out of time.
describe('NewOrderCard', () => {
  it('renders', () => {
    render(<NewOrderCard {...fakeProps} />);
  });

  it('renders with expected elements', () => {
    render(<NewOrderCard {...fakeProps} />);
    const img = screen.getByRole('img', { name: 'Pepperoni' }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pepperoni');

    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(4);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Pizza #1');
  });
});
