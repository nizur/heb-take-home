import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../contexts/auth';
import Input from '../Input';
import Button from '../Button';
import logo from '../../public/pizzatime-logo.png';

const isValidInput = (value: string): boolean => {
  return Boolean(value) && value.length > 2;
};

function LoginForm(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [ref])

  const canSubmit: boolean = isValidInput(username) && isValidInput(password);

  const changeUsername = ({ target }): void => {
    setUsername(target.value);
  };

  const changePassword = ({ target }): void => {
    setPassword(target.value);
  };

  const doLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <>
      <div className="h-screen container mx-auto flex justify-center items-center">
        <div className="w-80">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="PizzaTime" />
          </div>
          <div className="flex flex-col justify-center items-center gap-4 border-amber-300 p-4 border-2 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
            <div>
              <label className="font-bold text-amber-700 block mb-2">Username</label>
              <Input
                aria-label="username"
                value={username}
                onChange={changeUsername}
                ref={ref}
              />
            </div>
            <div>
              <label className="font-bold text-amber-700 block mb-2">Password</label>
              <Input
                aria-label="password"
                type="password"
                value={password}
                onChange={changePassword}
              />
            </div>
            <div>
              <Button
                className="rounded"
                onClick={doLogin}
                disabled={!canSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
