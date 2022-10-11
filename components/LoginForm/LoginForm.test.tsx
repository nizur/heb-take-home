import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const renderForm = () => {
  render(<LoginForm />);
  const usernameField = screen.getByLabelText('username');
  const passwordField = screen.getByLabelText('password');
  const submitButton = screen.getByRole('button');

  return {
    usernameField,
    passwordField,
    submitButton
  };
};

describe('LoginForm', () => {
  it('renders', () => {
    render(<LoginForm />);
  });

  it('renders with empty fields and disabled submit button', () => {
    const { usernameField, passwordField, submitButton } = renderForm();

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when all fields are valid', async () => {
    const { usernameField, passwordField, submitButton } = renderForm();

    expect(submitButton).toBeDisabled();

    await userEvent.type(usernameField, 'test');
    await userEvent.type(passwordField, 'test');

    expect(submitButton).toBeEnabled();
  });
});
