import { useTranslation } from "react-i18next";
import SignInForm from "./SignInForm";
import { useEffect } from "react";
import useAuth from "@/utils/hooks/useAuth";

const SignIn = () => {
  const { t } = useTranslation();
  const { emulateSignIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const hash = params.get("hash");
    const id = params.get("id");

    if (hash && id) {
      emulateSignIn(hash, id);
    }
  }, [emulateSignIn]);

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">{t("welcome_back")}</h3>
        <p>{t("enter_credential_to_login")}</p>
      </div>
      <SignInForm disableSubmit={false} />
    </>
  );
};

export default SignIn;
