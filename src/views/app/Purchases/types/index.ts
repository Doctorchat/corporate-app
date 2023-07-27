export interface Purchase {
  id: number;
  user_name: string;
  doctor_name: string;
  amount: string;
  transaction_type:
    | "chat_auto"
    | "chat_text"
    | "chat_video"
    | "file_attachment"
    | "medical_verdict_request";
  created_at: string;
}

export interface GetPurchasesResponse {
  current_page: number;
  data: Purchase[];
  per_page: number;
  total: number;
}
