import AdaptableCard from "@/components/shared/AdaptableCard";
import { Button, FormContainer, Input, Notification, toast } from "@/components/ui";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import FormRow from "./components/FormRow";
import { HiOutlineUserCircle } from "react-icons/hi";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  phone: Yup.string().min(3, "Too Short!").max(12, "Too Long!").required("User Name Required"),
});

const Settings = () => {
  const { t } = useTranslation();

  const onFormSubmit = (
    values: { phone: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    toast.push(<Notification title={"Profile updated"} type="success" />, {
      placement: "top-center",
    });
    setSubmitting(false);
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("general_settings")}</h3>
      </div>

      <Formik
        initialValues={{
          phone: "",
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
                <FormRow name="phone" label={t("phone")} {...validatorProps}>
                  <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder={t("phone")}
                    component={Input}
                    prefix={<HiOutlineUserCircle className="text-xl" />}
                  />
                  <div className="text-xs text-gray-500 mt-1">{t("phone_description")}</div>
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
    </AdaptableCard>
  );
};

export default Settings;
