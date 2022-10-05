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
  children: any; // TODO: Get rid of any
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
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      const { data } = await api.post('/auth', params);
      setIsLoading(false);
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
