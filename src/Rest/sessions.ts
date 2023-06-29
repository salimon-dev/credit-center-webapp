import { Axios } from "axios";
import { ICollection, ITransaction } from "../structs";

interface ICreateSessionParams {
  target: string;
  description: string;
}
export async function createSession(params: ICreateSessionParams) {}
