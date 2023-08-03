import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Notification from "@/components/ui/Notification";
import toast from "@/components/ui/toast";
import { FormContainer } from "@/components/ui/Form";
import FormRow from "./FormRow";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { apiChangePassword } from "@/services/AuthService";

type PasswordFormModel = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

const validationSchema = Yup.object().shape({
  current_password: Yup.string().required("validations.required"),
  new_password: Yup.string().min(8, "min_length_8").required("validations.required"),
  confirm_password: Yup.string()
    .required("validations.required")
    .oneOf([Yup.ref("new_password"), ""], "validations.password_mismatch"),
});

const ChangePassword = () => {
  const { t } = useTranslation();

  const onFormSubmit = async (
    values: PasswordFormModel,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await apiChangePassword({
        current_password: values.current_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      });
      toast.push(<Notification title={t("password_updated_successfully")} type="success" />, {
        placement: "top-center",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      toast.push(<Notification title={message} type="danger" />, {
        placement: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          current_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onFormSubmit(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ touched, errors, isSubmitting, resetForm }) => {
          const validatorProps = { touched, errors };
          return (
            <Form>
              <FormContainer>
                <div className="lg:flex items-center justify-between mb-4">
                  <h3 className="mb-4 lg:mb-0">{t("password")}</h3>
                </div>

                <FormRow name="current_password" label={t("current_password")} {...validatorProps}>
                  <Field
                    type="password"
                    autoComplete="off"
                    name="current_password"
                    placeholder={t("current_password")}
                    component={Input}
                  />
                </FormRow>
                <FormRow name="new_password" label={t("new_password")} {...validatorProps}>
                  <Field
                    type="password"
                    autoComplete="off"
                    name="new_password"
                    placeholder={t("new_password")}
                    component={Input}
                  />
                </FormRow>
                <FormRow
                  name="confirm_password"
                  label={t("confirm_new_password")}
                  {...validatorProps}
                >
                  <Field
                    type="password"
                    autoComplete="off"
                    name="confirm_password"
                    placeholder={t("confirm_new_password")}
                    component={Input}
                  />
                </FormRow>
                <div className="mt-4 ltr:text-right">
                  <Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={() => resetForm()}>
                    {t("reset")}
                  </Button>
                  <Button variant="solid" loading={isSubmitting} type="submit">
                    {isSubmitting ? t("saving") : t("save")}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ChangePassword;
