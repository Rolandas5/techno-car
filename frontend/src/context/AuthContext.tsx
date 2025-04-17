// Auth Context  - bus atsakingas uz žmogaus autentifikaciją, laikys funkcijas ir state

import { createContext, useState } from 'react';
import { API_URL } from '../constants/global';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface AuthContextType {
  isloading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  login: register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isloading: true,
  isAuthenticated: false,
  token: null,
  error: null,
  login: async () => {},
  register: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [isloading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      setToken
    } catch (error) {
      console.log(error);
      setError('Klaida registruojant vartotoją!');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider
        value={{ isloading, isAuthenticated, token, error, register }}

        {children}
    </AuthContext.Provider>
};
