import type { AppConfig } from "../models/AppConfig";

const config: AppConfig = {
  baseUrl: import.meta.env.BASE_URL ?? "http://1234:5678",
};

export default config;
