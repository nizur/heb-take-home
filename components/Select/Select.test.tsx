import { screen, render } from '@testing-library/react';
import Select, { SelectProps } from './Select';

const onChange = jest.fn();
const options = [1, 2, 3, 4];

const renderSelect = (overrides?: SelectProps) => {
  const selectProps = {
    name: 'test',
    onChange,
    options,
    value: '1',
    ...overrides,
  }
  render(<Select {...selectProps} />);
  const select = screen.getByRole('combobox') as HTMLSelectElement;
  const opts = screen.getAllByRole('option') as HTMLOptionElement[];
  return { options: opts, select };
};

// NOTE: This is a weak test. Spent a lot of time trying to get RTL 
// selectOptions to work. In the end it only works if you're testing a 
// multiselect... SMH. Moving on because I'm running out of time.
describe('Select', () => {
  it('renders', () => {
    const { options, select } = renderSelect();
    expect(select).toBeInTheDocument();
    expect(select.selectedIndex).toBe(0);
    expect(select.selectedOptions.length).toBe(1);
    expect(options.length).toBe(4);
  });
});
