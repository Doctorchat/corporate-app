import { useState } from "react";
import { FormItem, FormContainer } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import ActionLink from "@/components/shared/ActionLink";
import { apiForgotPassword } from "@/services/AuthService";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { CommonProps } from "@/@types/common";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormProps extends CommonProps {
  disableSubmit?: boolean;
  signInUrl?: string;
}

type ForgotPasswordFormSchema = {
  email: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("validations.required").email("validations.invalid_email"),
});

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { disableSubmit = false, className, signInUrl = "/sign-in" } = props;

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const [message, setMessage] = useTimeOutMessage();

  const onSendMail = async (
    values: ForgotPasswordFormSchema,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      const resp = await apiForgotPassword(values);
      if (resp.data) {
        setSubmitting(false);
        setEmailSent(true);
        setEmail(values.email);
      }
    } catch (errors) {
      setMessage(
        (errors as AxiosError<{ message: string }>)?.response?.data?.message ||
          (errors as Error).toString()
      );
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <div className="mb-6 max-w-sm mx-auto">
        {emailSent ? (
          <>
            <h3 className="mb-1">{t("forgot_password_page.sent.title")}</h3>
            <p>{t("forgot_password_page.sent.description")}</p>
          </>
        ) : (
          <>
            <h3 className="mb-1">{t("forgot_password_page.title")}</h3>
            <p>{t("forgot_password_page.description")}</p>
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
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSendMail(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className={emailSent ? "hidden" : ""}>
                <FormItem invalid={errors.email && touched.email} errorMessage={errors.email}>
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder={t("email_address")}
                    component={Input}
                  />
                </FormItem>
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type={emailSent ? "button" : "submit"}
                onClick={
                  emailSent ? () => navigate("/reset-password", { state: { email } }) : undefined
                }
              >
                {emailSent ? t("continue") : t("send_email")}
              </Button>
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

export default ForgotPasswordForm;
