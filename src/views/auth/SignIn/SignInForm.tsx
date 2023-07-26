import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FormItem, FormContainer } from "@/components/ui/Form";
import Alert from "@/components/ui/Alert";
import PasswordInput from "@/components/shared/PasswordInput";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import useAuth from "@/utils/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { CommonProps } from "@/@types/common";
import { useTranslation } from "react-i18next";

interface SignInFormProps extends CommonProps {
  disableSubmit?: boolean;
  forgotPasswordUrl?: string;
  signUpUrl?: string;
}

type SignInFormSchema = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("validations.invalid_email").required("validations.required"),
  password: Yup.string().required("validations.required"),
});

const SignInForm = (props: SignInFormProps) => {
  const { t } = useTranslation();

  const { disableSubmit = false, className } = props;

  const [message, setMessage] = useTimeOutMessage();

  const { signIn } = useAuth();

  const onSignIn = async (
    values: SignInFormSchema,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password } = values;
    setSubmitting(true);

    const result = await signIn({ email, password });

    if (result?.status === "failed") {
      setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          <>{message}</>
        </Alert>
      )}
      <Formik
        initialValues={{
          email: "novagroup@mail.com",
          password: "Denis2001",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label={t("email_address")}
                invalid={(errors.email && touched.email) as boolean}
                errorMessage={errors.email}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="email"
                  placeholder="example@mail.com"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label={t("password")}
                invalid={(errors.password && touched.password) as boolean}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="********"
                  component={PasswordInput}
                />
              </FormItem>
              {/* <div className="flex justify-end mb-6">
                <ActionLink to={forgotPasswordUrl}>{t("forgot_password")}</ActionLink>
              </div> */}
              <Button block loading={isSubmitting} variant="solid" type="submit">
                {t("login")}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
