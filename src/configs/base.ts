import devConfig from "./config.dev";
import prodConfig from "./config.prod";

export function baseUrl() {
  if (import.meta.env.PROD) {
    return prodConfig.baseUrl;
  }
  return devConfig.baseUrl;
}

export function source() {
  if (import.meta.env.PROD) {
    return prodConfig.source;
  }
  return devConfig.source;
}
