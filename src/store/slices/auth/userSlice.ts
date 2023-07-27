import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { SignInResponse } from "@/@types/auth";

export type UserState = SignInResponse["company"] & {
  authority: string[];
  transactions: SignInResponse["transactions"];
};

const initialState: UserState = {
  balance: "",
  contact_number: "",
  created_at: "",
  email: "",
  employeeCount: 0,
  id: 0,
  logo: "",
  name: "",
  updated_at: "",
  totalExpenses: 0,
  authority: [],
  transactions: [],
};

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.authority = action.payload.authority;
      state.balance = action.payload.balance;
      state.contact_number = action.payload.contact_number;
      state.created_at = action.payload.created_at;
      state.email = action.payload.email;
      state.employeeCount = action.payload.employeeCount;
      state.id = action.payload.id;
      state.logo = action.payload.logo;
      state.name = action.payload.name;
      state.totalExpenses = action.payload.totalExpenses;
      state.updated_at = action.payload.updated_at;
      state.transactions = action.payload.transactions;
    },
    setUserProperty(state, action: PayloadAction<Partial<UserState>>) {
      Object.keys(action.payload).forEach((key) => {
        state[key as keyof UserState] = action.payload[key as keyof UserState] as never;
      });
    },
  },
});

export const { setUser, setUserProperty } = userSlice.actions;
export default userSlice.reducer;
