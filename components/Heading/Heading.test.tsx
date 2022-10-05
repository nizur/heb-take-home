import { screen, render } from '@testing-library/react';
import Heading from './Heading';

describe('Heading', () => {
  it('renders', () => {
    render(<Heading>Hi</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hi');
  });
});
