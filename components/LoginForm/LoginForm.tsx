import { MouseEvent } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth';

const isValidInput = (value: string): boolean => {
  return Boolean(value) && value.length > 2;
};

function LoginForm(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();

  const canSubmit: boolean = isValidInput(username) && isValidInput(password);

  const changeUsername = ({ target }): void => {
    setUsername(target.value);
  };

  const changePassword = ({ target }): void => {
    setPassword(target.value);
  };

  const doLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await login(username, password);
    console.log(response);
  };

  return (
    <form>
      <input type="text" placeholder="Enter a username" value={username} onChange={changeUsername} />
      <input type="password" placeholder="Enter a password" value={password} onChange={changePassword} />
      <button onClick={doLogin} disabled={!canSubmit}>Login</button>
    </form>
  );
}

export default LoginForm;
