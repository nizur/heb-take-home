import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input, { InputProps } from './Input';

const onChange = jest.fn();

const renderInput = (props: InputProps) => {
  render(<Input {...props} onChange={onChange} />);
  return screen.getByDisplayValue(props.value) as HTMLInputElement;
};

describe('Input', () => {
  it('renders', () => {
    render(<Input value="test" onChange={onChange} />);
  });

  it('renders a text field if no type is passed', () => {
    const value = 'This is a test';
    const input = renderInput({ value });
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input.value).toBe(value);
  });

  it('renders an input field with the given props', () => {
    const props = {
      placeholder: 'Placeholder',
      type: 'password',
      value: 'test'
    };
    const input = renderInput(props);
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('password');
    expect(input.placeholder).toBe('Placeholder');
  });

  it('correctly calls onChange handler when input value changes', async () => {
    const input = renderInput({ value: 'test' })
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(input, 'Test');
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
