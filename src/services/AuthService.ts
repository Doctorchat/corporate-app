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

export async function apiForgotPassword(data: { email: string }) {
  return ApiService.fetchData({
    url: "/auth/companies/forgot-password",
    method: "post",
    data,
  });
}

export async function apiResetPassword(data: {
  email: string;
  code: string;
  password: string;
  confirm_password: string;
}) {
  return ApiService.fetchData({
    url: "/auth/companies/reset-password",
    method: "post",
    data,
  });
}

export async function apiAuthRevalidate() {
  return ApiService.fetchData<Omit<SignInResponse, "token">>({
    url: "/companies/company",
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

export async function apiChangeContactNumber(data: { contact_number: string }) {
  return ApiService.fetchData({
    url: "/companies/change-contact-number",
    method: "put",
    data,
  });
}

export async function apiChangePassword(data: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) {
  return ApiService.fetchData({
    url: "/companies/change-password",
    method: "put",
    data,
  });
}

export async function apiGetInviteInfo() {
  return ApiService.fetchData<{ qr: string; url: string }>({
    url: `/companies/invite`,
    method: "get",
  });
}
