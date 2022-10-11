import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();

describe('Button', () => {
  it('renders', async () => {
    render(<Button onClick={onClick}>Test</Button>);
  });

  it('calls the onClick handler when clicked', async () => {
    render(<Button onClick={onClick}>Test</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Test');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled if the disabled prop is true', async () => {
    render(<Button disabled onClick={onClick}>Test</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Test');
    expect(button).toBeDisabled();
  });
});
