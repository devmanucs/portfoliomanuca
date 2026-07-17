import { api } from "@/core/api/axios-instance";
import type { IAuthUser, ILoginRequest } from "@portfoliomanuca/types";

export async function login(credentials: ILoginRequest) {
  const { data } = await api.post<{ user: IAuthUser }>(
    "/auth/login",
    credentials,
    { showToast: false },
  );
  return data.user;
}

export async function logout() {
  await api.post("/auth/logout", undefined, { showToast: false });
}

export async function getMe() {
  const { data } = await api.get<IAuthUser>("/auth/me", { showToast: false });
  return data;
}
