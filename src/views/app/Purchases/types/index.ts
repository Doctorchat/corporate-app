export interface Purchase {
  id: number;
  client: string;
  doctor: string;
  price: number;
  created_at: string;
}

export interface GetPurchasesResponse {
  current_page: number;
  data: Purchase[];
  per_page: number;
  total: number;
}
