import { Axios } from "axios";
import { ICollection, IUser } from "../structs";

export function fecthUser(name: string, axios: Axios) {
  return axios
    .get<{ ok: boolean; user: IUser }>("/fetch/" + name)
    .then((response) => response.data.user);
}

interface ISearchUsersParams {
  name?: string;
  page?: number;
  pageSize?: number;
}
export function searchUsers(params: ISearchUsersParams, axios: Axios) {
  return axios
    .get<ICollection<IUser>>("/users", { params })
    .then((response) => response.data);
}
