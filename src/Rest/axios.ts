import axios from "axios";
import { getEnv } from "../utils";

let accessToken: string | undefined;

export function setAxiosAccessToken(value?: string) {
  accessToken = value;
}
export function createAxios() {
  if (accessToken) {
    return axios.create({
      baseURL: getEnv("BASE_URL"),
      headers: { Authorization: "Bearer " + accessToken },
    });
  } else {
    return axios.create({
      baseURL: getEnv("BASE_URL"),
    });
  }
}
