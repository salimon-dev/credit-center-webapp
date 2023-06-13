import devConfig from "./config.dev";
import prodConfig from "./config.prod";
export function baseUrl() {
  if (import.meta.env.PROD) {
    return prodConfig.baseUrl;
  }
  return devConfig.baseUrl;
}
