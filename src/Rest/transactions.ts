import { Axios } from "axios";
import { ICollection, ITransaction } from "../structs";

interface ISearchTransactionsParams {
  page?: number;
  pageSize?: number;
  from?: string;
  to?: string;
  address?: string;
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

interface ITransactionsParams {
  name: string;
  amount: number;
}
export async function sendBalance(params: ITransactionsParams, axios: Axios) {
  return axios
    .post<{ ok: boolean; transaction: ITransaction }>(
      "/transactions/send",
      params
    )
    .then((response) => response.data.transaction);
}
export async function demandBalance(params: ITransactionsParams, axios: Axios) {
  return axios
    .post<{ ok: boolean; transaction: ITransaction }>(
      "/transactions/demand",
      params
    )
    .then((response) => response.data.transaction);
}

export async function extecuteTransaction(id: string, axios: Axios) {
  return axios
    .post<{ ok: boolean }>("/transactions/execute", { id })
    .then((response) => response.data.ok);
}

export async function declineTransaction(id: string, axios: Axios) {
  return axios
    .post<{ ok: boolean }>("/transactions/decline", { id })
    .then((response) => response.data.ok);
}

export async function getFee(amount: number, axios: Axios) {
  return axios
    .get<{ ok: boolean; amount: number; fee: number }>("/transactions/getFee", {
      params: { amount },
    })
    .then((response) => response.data);
}
