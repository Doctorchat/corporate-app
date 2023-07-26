import ApiService from "./ApiService";
import type { SignInCredential, SignInResponse } from "@/@types/auth";

export async function apiSignIn(data: SignInCredential) {
  return ApiService.fetchData<SignInResponse>({
    url: "/auth/companies/login",
    method: "post",
    data,
  });
}

export async function apiSignOut() {
  return ApiService.fetchData({
    url: "/auth/companies/logout",
    method: "post",
  });
}

export async function apiAuthRevalidate() {
  return ApiService.fetchData<SignInResponse>({
    url: "/auth/companies/company",
    method: "get",
  });
}

export async function apiEmulateSignIn(hash: string, id: string) {
  return ApiService.fetchData<SignInResponse>({
    url: `/auth/companies/emulate`,
    method: "post",
    data: {
      hash,
      id,
    },
  });
}
