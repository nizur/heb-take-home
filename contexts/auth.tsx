import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import api from '../services/api';

export interface Context {
  accessToken: string;
  isLoading: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const tokenCookieName = 'accessToken';
export const AuthContext = createContext({} as Context);

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get(tokenCookieName);

      if (token) {
        console.log(`Found token ${token}`);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setAccessToken(token);
      }
      setIsLoading(false);
    };

    loadUserFromCookies();
  }, [accessToken, setAccessToken]);


  const login = async (username: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth', { username, password });
      setIsLoading(false);
      // TODO: Parse and save token
      console.log(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const logout = (): void => {
    Cookies.remove(tokenCookieName);
    setAccessToken(null);
    delete api.defaults.headers.common.Authorization;
    router.push('/login');
  };

  const context = {
    accessToken,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
