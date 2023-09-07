import ApiService from "./ApiService";

export async function apiGetEmployees<T, U extends Record<string, unknown>>(params: U) {
  return ApiService.fetchData<T>({
    url: "/companies/employees",
    method: "get",
    params,
  });
}
export async function apiValidateEmployee<T>(id: number) {
  return ApiService.fetchData<T>({
    url: `/companies/employees/${id}/validate`,
    method: "put",
  });
}

export async function apiDeleteEmployee<T>(id: number) {
  return ApiService.fetchData<T>({
    url: `/companies/employees/${id}/delete`,
    method: "delete",
  });
}

export async function apiAddSoldCurrent<T>(data: { amount: number }) {
  return ApiService.fetchData<T>({
    url: `/companies/topup`,
    method: "post",
    data,
  });
}
