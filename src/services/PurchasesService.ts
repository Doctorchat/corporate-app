import ApiService from "./ApiService";

export async function apiGetPurchases<T, U extends Record<string, unknown>>(params: U) {
  return ApiService.fetchData<T>({
    url: "/companies/transactions",
    method: "get",
    params,
  });
}
