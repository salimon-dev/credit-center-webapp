import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../structs";

export interface IAuthContext {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  setUser: () => {
    return;
  },
});

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const localUser = JSON.parse(data);
      setUser(localUser as IUser);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (data?: IUser) => {
          setUser(data);
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAxios() {
  const { user } = useContext(AuthContext);
  if (user) {
    return axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: { Authorization: "Bearer " + user.secretToken },
    });
  } else {
    return axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
  }
}

export function useIsLoggedIn() {
  const { user } = useContext(AuthContext);
  return !!user;
}
