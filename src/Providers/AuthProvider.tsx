import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../structs";
import { baseUrl } from "../configs/base";

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
          } else {
            localStorage.removeItem("user");
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
      baseURL: baseUrl(),
      headers: { Authorization: "Bearer " + user.secretToken },
    });
  } else {
    return axios.create({
      baseURL: baseUrl(),
    });
  }
}

export function useIsLoggedIn() {
  const { user } = useContext(AuthContext);
  return !!user;
}
