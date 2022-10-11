import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CancelButton from './CancelButton';

const onClick = jest.fn();

describe('CancelButton', () => {
  it('renders', () => {
    render(<CancelButton onClick={onClick} />);
  });

  it('calls the onClick handler when clicked', async () => {
    render(<CancelButton onClick={onClick} />);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });
});
