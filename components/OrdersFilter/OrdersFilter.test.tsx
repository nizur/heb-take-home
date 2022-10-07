import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrdersFilter from './OrdersFilter';

const fakeOptions = ['One', 'Two', 'Three'];
const onFilter = jest.fn();

const renderFilter = () => {
  render(<OrdersFilter options={fakeOptions} onFilter={onFilter} />);
  const select = screen.getByDisplayValue('One') as HTMLSelectElement;
  const filter = screen.getByRole('textbox') as HTMLInputElement;
  const button = screen.getByRole('button') as HTMLButtonElement;
  return {
    select,
    filter,
    button
  };
};

describe('OrdersFilter', () => {
  it('renders', () => {
    const { select, filter, button } = renderFilter();
    expect(select).toBeInTheDocument();
    expect(select.options.length).toBe(3);

    expect(filter).toBeInTheDocument();
    expect(filter.placeholder).toBe('Search...');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('lets you search by different properties', async () => {
    const { select, filter, button } = renderFilter();

    await userEvent.type(filter, 'test');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);
    expect(onFilter).toBeCalledWith({ prop: 'One', value: 'test' });

    await userEvent.selectOptions(select, 'Two');
    await userEvent.clear(filter);
    await userEvent.type(filter, 'blargh');
    await userEvent.click(button);
    expect(onFilter).toBeCalledWith({ prop: 'Two', value: 'blargh' });
  });
});
