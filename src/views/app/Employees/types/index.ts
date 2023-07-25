export interface Employee {
  id: number;
  name: string;
  phone: string;
  is_verified_by_company: boolean;
  created_at: string;
}

export interface GetEmployeesResponse {
  current_page: number;
  data: Employee[];
  per_page: number;
  total: number;
}
