import { Axios } from "axios";
import { ICollection, ISession } from "../structs";

interface ICreateSessionParams {
  target: string;
  description: string;
}
export async function createSession(
  params: ICreateSessionParams,
  axios: Axios
) {
  return axios.post("/sessions/create", params).then(() => true);
}

interface IVerifySessionParams {
  sessionId: string;
  token: string;
}
export async function verifySession(
  params: IVerifySessionParams,
  axios: Axios
) {
  return axios.post("/sessions/verify", params).then(() => true);
}

interface ISearchSessionsParams {
  page: number;
  pageSize: number;
}

export async function searchSessions(
  params: ISearchSessionsParams,
  axios: Axios
) {
  return axios
    .get<ICollection<ISession>>("/sessions/search", { params })
    .then((response) => response.data);
}
