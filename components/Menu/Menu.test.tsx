import { screen, render } from '@testing-library/react';
import { AuthContext, Context } from '../../contexts/auth';
import Menu from './Menu';

const renderMenu = (context: Context) => {
  return render(
    <AuthContext.Provider value={context}>
      <Menu />
    </AuthContext.Provider>
  );
};

describe('Menu', () => {
  it('renders as null when no access token is available', () => {
    renderMenu({ isLoading: true, accessToken: null });
    const orders = screen.queryByText('Orders');
    expect(orders).not.toBeInTheDocument();
  });

  it('renders the menu when access token is available', async () => {
    renderMenu({ isLoading: false, accessToken: 'fake' });
    const orders = await screen.findByText('Orders');
    expect(orders).toBeInTheDocument();
  });
});
