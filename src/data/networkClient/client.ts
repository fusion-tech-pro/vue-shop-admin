import axios from "axios";

import config from "@/core/config";
import { AuthenticationInteceptor } from "./interceptors/authenticationInterceptor";

const client = axios.create({
  baseURL: config.baseUrl,
});

client.interceptors.request.use(AuthenticationInteceptor);

export default client;
