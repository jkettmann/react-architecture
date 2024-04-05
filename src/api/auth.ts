import { apiClient } from "./client";
import { Credentials, MeDto } from "./dtos";

export async function getMe() {
  const response = await apiClient.get<{ data: MeDto }>("/me");
  const me = response.data.data;
  return me;
}

async function login(credentials: Credentials) {
  await apiClient.post("/login", credentials);
}

async function logout() {
  await apiClient.post("/logout");
}

export default { login, logout };
