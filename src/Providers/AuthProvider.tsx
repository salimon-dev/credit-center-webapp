import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../structs";
import { getProfile } from "../Rest/users";
import { setAxiosAccessToken } from "../Rest/axios";

export interface IAuthContext {
  accessToken?: string;
  expiresAt?: number;
  profile?: IUser;
  authorize: (profile: IUser, accessToken: string, expiresAt: number) => void;
  unauthorize: () => void;
  updateProfile: (profile: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authorize: () => {
    return;
  },
  unauthorize: () => {
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
  const [profile, setProfile] = useState<IUser>();
  const [accessToken, setAccessToken] = useState<string>();
  const [expiresAt, setExpiresAt] = useState<number>();
  const [loading, setLoading] = useState(true);

  function authorize(profile: IUser, accessToken: string, expiresAt: number) {
    setProfile(profile);
    setAccessToken(accessToken);
    setExpiresAt(expiresAt);
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresAt", expiresAt + "");
    setAxiosAccessToken(accessToken);
  }

  function unauthorize() {
    localStorage.removeItem("profile");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    setProfile(undefined);
    setAccessToken(undefined);
    setExpiresAt(undefined);
    setAxiosAccessToken(undefined);
  }
  useEffect(() => {
    const data = localStorage.getItem("accessToken");
    if (data) {
      setAxiosAccessToken(data);
      getProfile()
        .then((response) => {
          authorize(response.user, response.accessToken, response.expiresAt);
        })
        .catch(() => {
          unauthorize();
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
        profile,
        accessToken,
        expiresAt,
        authorize,
        unauthorize,
        updateProfile: setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useIsLoggedIn() {
  const { accessToken } = useContext(AuthContext);
  return !!accessToken;
}
