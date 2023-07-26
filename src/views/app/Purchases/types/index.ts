export interface Purchase {
  id: number;
  user_name: string;
  doctor_name: string;
  amount: string;
  created_at: string;
}

export interface GetPurchasesResponse {
  current_page: number;
  data: Purchase[];
  per_page: number;
  total: number;
}
