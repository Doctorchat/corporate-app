export type SignInCredential = {
  email: string;
  password: string;
};

export type SignInResponse = {
  company: {
    id: number;
    name: string;
    logo: string | null;
    email: string;
    contact_number: string | null;
    balance: string;
    created_at: string;
    updated_at: string;
    employeeCount: number;
    totalExpenses: number;
  };
  transactions: {
    transaction_id: number;
    transaction_type: string;
    amount: string;
    created_at: string;
    doctor_name: string;
    user_name: string;
  }[];
  token: string;
};
