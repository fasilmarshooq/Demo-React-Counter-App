import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export function login(Credentials) {
  return http.post(apiEndpoint, {
    email: Credentials.UserName,
    password: Credentials.Password,
  });
}
