import { apiAuthRevalidate, apiEmulateSignIn, apiSignIn, apiSignOut } from "@/services/AuthService";
import { setUser, signInSuccess, signOutSuccess, useAppSelector, useAppDispatch } from "@/store";
import appConfig from "@/configs/app.config";
import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";
import type { SignInCredential } from "@/@types/auth";
import { useCallback } from "react";

type Status = "success" | "failed";

function useAuth() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useAppSelector((state) => state.auth.session);

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
        status: Status;
        message: string;
      }
    | undefined
  > => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(signInSuccess(token));
        if (resp.data.company) {
          dispatch(
            setUser({ ...resp.data.company, authority: [], transactions: resp.data.transactions })
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = useCallback(() => {
    dispatch(signOutSuccess());
    dispatch(
      setUser({
        balance: "",
        contact_number: "",
        created_at: "",
        email: "",
        employeeCount: 0,
        id: 0,
        logo: "",
        name: "",
        totalExpenses: 0,
        updated_at: "",
        authority: [],
        transactions: [],
      })
    );
    navigate(appConfig.unAuthenticatedEntryPath);
  }, [dispatch, navigate]);

  const revalidateAuth = useCallback(async () => {
    try {
      const resp = await apiAuthRevalidate();
      console.log(resp.data);
    } catch (errors: any) {
      handleSignOut();
    }
  }, [handleSignOut]);

  const emulateSignIn = useCallback(
    async (hash: string, id: string) => {
      try {
        const resp = await apiEmulateSignIn(hash, id);
        if (resp.data) {
          const { token } = resp.data;
          dispatch(signInSuccess(token));
          if (resp.data.company) {
            console.log(resp.data);

            dispatch(
              setUser({ ...resp.data.company, authority: [], transactions: resp.data.transactions })
            );
          }
          const redirectUrl = query.get(REDIRECT_URL_KEY);
          navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
          return {
            status: "success",
            message: "",
          };
        }
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      } catch (errors: any) {
        return {
          status: "failed",
          message: errors?.response?.data?.message || errors.toString(),
        };
      }
    },
    [dispatch, navigate, query]
  );

  const signOut = async () => {
    await apiSignOut();
    handleSignOut();
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signOut,
    revalidateAuth,
    emulateSignIn,
  };
}

export default useAuth;
