import { ICollection, ITransaction } from "../structs";
import { createAxios } from "./axios";

interface ISearchTransactionsParams {
  page?: number;
  pageSize?: number;
  from?: string;
  to?: string;
  address?: string;
}
export async function searchTransactions(params: ISearchTransactionsParams) {
  return createAxios()
    .get<ICollection<ITransaction>>("/transactions", {
      params,
    })
    .then((response) => response.data);
}

interface ITransactionsParams {
  name: string;
  amount: number;
}
export async function sendBalance(params: ITransactionsParams) {
  return createAxios()
    .post<{ ok: boolean; transaction: ITransaction }>(
      "/transactions/send",
      params
    )
    .then((response) => response.data.transaction);
}
export async function demandBalance(params: ITransactionsParams) {
  return createAxios()
    .post<{ ok: boolean; transaction: ITransaction }>(
      "/transactions/demand",
      params
    )
    .then((response) => response.data.transaction);
}

export async function extecuteTransaction(id: string) {
  return createAxios()
    .post<{ ok: boolean }>("/transactions/execute", { id })
    .then((response) => response.data.ok);
}

export async function declineTransaction(id: string) {
  return createAxios()
    .post<{ ok: boolean }>("/transactions/decline", { id })
    .then((response) => response.data.ok);
}

export async function getFee(amount: number) {
  return createAxios()
    .get<{ ok: boolean; amount: number; fee: number }>("/transactions/getFee", {
      params: { amount },
    })
    .then((response) => response.data);
}
