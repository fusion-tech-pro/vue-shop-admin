import type { AxiosRequestConfig } from "axios";

import { tokenSource } from "@/data/tokenSource";

export function AuthenticationInteceptor(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  // TODO: Implement refresh here, if backend asks

  const token = tokenSource.accessToken;
  if (token && config !== undefined) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
}
