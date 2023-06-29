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
import { getProfile } from "../Rest/users";

export interface IAuthContext {
  user?: IUser;
  setUser: (user?: IUser) => void;
  updateProfile: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  setUser: () => {
    return;
  },
  updateProfile: () => {
    return;
  },
});

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  async function updateProfile() {
    if (!user) {
      setLoading(false);
      return;
    }
    getProfile(
      axios.create({
        baseURL: baseUrl(),
        headers: { Authorization: "Bearer " + user.secretToken },
      })
    )
      .then((response) => {
        setUser({
          ...user,
          name: response.user.name,
          balance: response.user.balance,
          score: response.user.score,
          otp: response.user.otp,
        });
        localStorage.setItem("token", user.secretToken);
      })
      .catch(() => {
        setUser(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const localUser = JSON.parse(data);
      getProfile(
        axios.create({
          baseURL: baseUrl(),
          headers: { Authorization: "Bearer " + localUser.secretToken },
        })
      )
        .then((response) => {
          setUser({
            ...localUser,
            name: response.user.name,
            balance: response.user.balance,
            score: response.user.score,
            otp: response.user.otp,
          });
          localStorage.setItem("token", localUser.secretToken);
        })
        .catch(() => {
          setUser(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        updateProfile,
        setUser: (data?: IUser) => {
          setUser(data);
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.secretToken);
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
