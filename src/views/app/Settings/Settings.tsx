import AdaptableCard from "@/components/shared/AdaptableCard";
import { Button, FormContainer, Notification, toast } from "@/components/ui";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import FormRow from "./components/FormRow";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { apiChangeContactNumber } from "@/services/AuthService";
import { setUserProperty, useAppDispatch, useAppSelector } from "@/store";
import * as Yup from "yup";

import "react-phone-input-2/lib/style.css";
import "./styles/index.css";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .test("phone", "validations.invalid_phone", (value) => {
      const withPlus = value?.startsWith("+") ? value : `+${value}`;
      return isValidPhoneNumber(withPlus || "");
    })
    .required("validations.required"),
});

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const company = useAppSelector((state) => state.auth.user);

  const onFormSubmit = async (
    values: { phone: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await apiChangeContactNumber({
        contact_number: values.phone,
      });
      dispatch(
        setUserProperty({
          contact_number: values.phone,
        })
      );
      toast.push(<Notification title={"Profile updated"} type="success" />, {
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
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("general_settings")}</h3>
      </div>

      <Formik
        initialValues={{
          phone: company?.contact_number || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onFormSubmit(values, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm, ...formProps }) => {
          const validatorProps = { touched, errors };
          return (
            <Form>
              <FormContainer>
                <FormRow name="phone" label={t("phone")} {...validatorProps}>
                  <PhoneInput
                    countryCodeEditable={false}
                    country="md"
                    preferredCountries={["md"]}
                    regions={["america", "europe"]}
                    containerClass="phone-input__container"
                    inputClass="phone-input__input"
                    buttonClass="phone-input__button"
                    dropdownClass="phone-input__dropdown"
                    value={values.phone}
                    onChange={(phone) => formProps.setFieldValue("phone", phone)}
                    onBlur={() => formProps.setFieldTouched("phone", true)}
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
