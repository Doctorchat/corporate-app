import { useState } from "react";
import { FormItem, FormContainer } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import PasswordInput from "@/components/shared/PasswordInput";
import ActionLink from "@/components/shared/ActionLink";
import { apiResetPassword } from "@/services/AuthService";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { CommonProps } from "@/@types/common";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui";

interface ResetPasswordFormProps extends CommonProps {
  disableSubmit?: boolean;
  signInUrl?: string;
}

type ResetPasswordFormSchema = {
  email: string;
  code: string;
  password: string;
  confirm_password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("validations.required"),
  code: Yup.string().required("validations.required").length(6),
  password: Yup.string().required("validations.required"),
  confirm_password: Yup.string()
    .required("validations.required")
    .oneOf([Yup.ref("password")], "validations.passwords_mismatch"),
});

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { t } = useTranslation();
  const { disableSubmit = false, className, signInUrl = "/sign-in" } = props;

  const [resetComplete, setResetComplete] = useState(false);

  const [message, setMessage] = useTimeOutMessage();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (
    values: ResetPasswordFormSchema,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, code, password, confirm_password } = values;
    setSubmitting(true);
    try {
      const resp = await apiResetPassword({ email, code, password, confirm_password });
      if (resp.data) {
        setSubmitting(false);
        setResetComplete(true);
      }
    } catch (errors) {
      setMessage(
        (errors as AxiosError<{ message: string }>)?.response?.data?.message ||
          (errors as Error).toString()
      );
      setSubmitting(false);
    }
  };

  const onContinue = () => {
    navigate("/sign-in");
  };

  return (
    <div className={className}>
      <div className="mb-6">
        {resetComplete ? (
          <>
            <h3 className="mb-1">{t("reset_password_page.success.title")}</h3>
            <p>{t("reset_password_page.success.description")}</p>
          </>
        ) : (
          <>
            <h3 className="mb-1">{t("reset_password_page.title")}</h3>
            <p>{t("reset_password_page.description")}</p>
          </>
        )}
      </div>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: (location.state?.email as string) ?? "",
          code: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSubmit(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              {!resetComplete ? (
                <>
                  <FormItem
                    label={t("email_address")}
                    invalid={errors.email && touched.email}
                    errorMessage={errors.email}
                  >
                    <Field
                      type="email"
                      autoComplete="off"
                      name="email"
                      placeholder={t("email_address")}
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label={t("email_code")}
                    invalid={errors.code && touched.code}
                    errorMessage={errors.code}
                  >
                    <Field
                      autoComplete="off"
                      name="code"
                      placeholder={t("email_code")}
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label={t("password")}
                    invalid={errors.password && touched.password}
                    errorMessage={errors.password}
                  >
                    <Field
                      autoComplete="off"
                      name="password"
                      placeholder={t("password")}
                      component={PasswordInput}
                    />
                  </FormItem>
                  <FormItem
                    label={t("confirm_password")}
                    invalid={errors.confirm_password && touched.confirm_password}
                    errorMessage={errors.confirm_password}
                  >
                    <Field
                      autoComplete="off"
                      name="confirm_password"
                      placeholder={t("confirm_password")}
                      component={PasswordInput}
                    />
                  </FormItem>
                  <Button block loading={isSubmitting} variant="solid" type="submit">
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>
                </>
              ) : (
                <Button block variant="solid" type="button" onClick={onContinue}>
                  {t("continue")}
                </Button>
              )}

              <div className="mt-4 text-center">
                <span>{t("back_to")} </span>
                <ActionLink to={signInUrl}>{t("login")}</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
