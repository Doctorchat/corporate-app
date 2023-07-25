import ApiService from "./ApiService";

export async function apiGetEmployees<T, U extends Record<string, unknown>>(params: U) {
  return ApiService.fetchData<T>({
    url: "/companies/employees",
    method: "get",
    params,
  });
}
