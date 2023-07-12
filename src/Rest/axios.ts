import axios from "axios";
import { baseUrl } from "../configs/base";

let accessToken: string | undefined;

export function setAxiosAccessToken(value?: string) {
  accessToken = value;
}
export function createAxios() {
  if (accessToken) {
    return axios.create({
      baseURL: baseUrl(),
      headers: { Authorization: "Bearer " + accessToken },
    });
  } else {
    return axios.create({
      baseURL: baseUrl(),
    });
  }
}
