import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN = "my-token";
export const URL = "https://chain-fit-app-sandeepraor.vercel.app";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN);
      axios.defaults.headers.common["Authorization"] = token;
      setAuthState({
        token: token,
        authenticated: true,
      });
    };
    checkToken();
  });

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/user/register`, {
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/user/login`, {
        email: email,
        password: password,
      });

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN, response.data.token);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN);
      setAuthState({
        token: null,
        authenticated: false,
      });
      axios.defaults.headers.common["Authorization"] = "";
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
