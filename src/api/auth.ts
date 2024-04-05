import { Credentials } from "@/types";

import { apiClient } from "./client";

async function login(credentials: Credentials) {
  await apiClient.post("/login", credentials);
}

async function logout() {
  await apiClient.post("/logout");
}

export default { login, logout };
