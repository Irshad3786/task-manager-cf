import { apiFetch } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
};

type RegisterResponse = {
  user: User;
};

type LoginResponse = {
  token: string;
  user: User;
};

export async function register(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getMe(token: string): Promise<User> {
  const response = await apiFetch<{ user: User }>("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.user;
}