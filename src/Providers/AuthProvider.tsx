import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

export interface IAuthContext {
  secretToken?: string;
  name?: string;
  authorize: (secretToken: string, name: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authorize: () => {
    return;
  },
});

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [secretToken, setSecretToken] = useState<string>();
  const [name, setName] = useState<string>();

  function authorize(st: string, n: string) {
    setSecretToken(st);
    setName(n);
  }
  return (
    <AuthContext.Provider value={{ secretToken, name, authorize }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAxios() {
  const { secretToken } = useContext(AuthContext);
  if (secretToken) {
    return axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: { Authorization: "Bearer " + secretToken },
    });
  } else {
    return axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
  }
}
