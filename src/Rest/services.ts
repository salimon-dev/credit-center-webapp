import { ICollection, IService } from "../structs";
import { createAxios } from "./axios";

interface ICreateServiceParams {
  title: string;
  description: string;
  homePage: string;
  terms?: string;
  baseUrl: string;
  type: string;
  secretToken: string;
}
export async function createService(params: ICreateServiceParams) {
  return createAxios()
    .post<{ ok: boolean; service: IService }>("/services/", params)
    .then(() => true);
}

export async function editService(
  id: string,
  params: Partial<ICreateServiceParams>
) {
  return createAxios()
    .post<{ ok: boolean; service: IService }>("/services/" + id, params)
    .then((response) => response.data);
}

export async function removeService(id: string) {
  return createAxios()
    .delete("/services/" + id)
    .then(() => true);
}

interface ISearchServices {
  page?: number;
  pageSize?: number;
}
export async function searchServices(params: ISearchServices) {
  return createAxios()
    .get<ICollection<IService>>("/services", { params })
    .then((response) => response.data);
}
