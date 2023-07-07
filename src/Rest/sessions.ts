import { ICollection, ISession } from "../structs";
import { createAxios } from "./axios";

interface ICreateSessionParams {
  target: string;
  description: string;
}
export async function createSession(params: ICreateSessionParams) {
  return createAxios()
    .post("/sessions/create", params)
    .then(() => true);
}

interface IVerifySessionParams {
  sessionId: string;
  token: string;
}
export async function verifySession(params: IVerifySessionParams) {
  return createAxios()
    .post("/sessions/verify", params)
    .then(() => true);
}

interface ISearchSessionsParams {
  page: number;
  pageSize: number;
}

export async function searchSessions(params: ISearchSessionsParams) {
  return createAxios()
    .get<ICollection<ISession>>("/sessions/search", { params })
    .then((response) => response.data);
}
