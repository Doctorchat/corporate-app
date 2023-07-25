// eslint-disable-next-line import/no-named-as-default
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ro from "./lang/ro.json";
import ru from "./lang/ru.json";
import appConfig from "@/configs/app.config";

const resources = {
  ro: {
    translation: ro,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: appConfig.locale,
  lng: appConfig.locale,
  interpolation: {
    escapeValue: false,
  },
});

export const dateLocales: {
  [key: string]: () => Promise<ILocale>;
} = {
  ro: () => import("dayjs/locale/ro"),
  ru: () => import("dayjs/locale/ru"),
};

export default i18n;
