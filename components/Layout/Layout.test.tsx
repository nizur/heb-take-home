import { screen, render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders', () => {
    render(<Layout><p>Hi</p></Layout>);
    const hi = screen.getByText('Hi');
    expect(hi).toBeInTheDocument();
  });
});
