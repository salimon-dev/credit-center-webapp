import { ICollection, IUser } from "../structs";
import { createAxios } from "./axios";

export function fecthUser(name: string) {
  return createAxios()
    .get<{ ok: boolean; user: IUser }>("/fetch", { params: { name } })
    .then((response) => response.data.user);
}

interface ISearchUsersParams {
  name?: string;
  page?: number;
  pageSize?: number;
}
export function searchUsers(params: ISearchUsersParams) {
  return createAxios()
    .get<ICollection<IUser>>("/users", { params })
    .then((response) => response.data);
}

export interface IAuthParams {
  name: string;
  password: string;
}

export interface IAuthResponse {
  ok: boolean;
  user: IUser;
  accessToken: string;
  expiresAt: number;
}

export function register(params: { name: string; secretToken: string }) {
  return createAxios()
    .post<IAuthResponse>("/auth/register", params)
    .then((response) => response.data);
}

export function login(params: IAuthParams) {
  return createAxios()
    .post<IAuthResponse>("/auth/login", params)
    .then((response) => response.data);
}

export function getProfile() {
  return createAxios()
    .get<IAuthResponse>("/auth/profile")
    .then((response) => response.data);
}
