import { Axios } from "axios";
import { ICollection, ITransaction } from "../structs";

interface ISearchTransactionsParams {
  page?: number;
  pageSize?: number;
  from?: string;
  to?: string;
}
export async function searchTransactions(
  params: ISearchTransactionsParams,
  axios: Axios
) {
  return axios
    .get<ICollection<ITransaction>>("/transactions", {
      params,
    })
    .then((response) => response.data);
}

interface ISendBalanceParams {
  to: string;
  amount: number;
}
export async function sendBalance(params: ISendBalanceParams, axios: Axios) {
  return axios
    .post<{ ok: boolean; transaction: ITransaction }>("/send", params)
    .then((response) => response.data.transaction);
}

interface IDemandBalanceParams {
  from: string;
  amount: number;
}
export async function demandBalance(
  params: IDemandBalanceParams,
  axios: Axios
) {
  return axios
    .post<{ ok: boolean; transaction: ITransaction }>("/demand", params)
    .then((response) => response.data.transaction);
}

export async function extecuteTransaction(id: string, axios: Axios) {
  return axios
    .post<{ ok: boolean }>("/execute/" + id)
    .then((response) => response.data.ok);
}

export async function declineTransaction(id: string, axios: Axios) {
  return axios
    .post<{ ok: boolean }>("/decline/" + id)
    .then((response) => response.data.ok);
}
