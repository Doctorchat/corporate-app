export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  tourPath: string;
  locale: string;
  enableMock: boolean;
};

const appConfig: AppConfig = {
  apiPrefix: import.meta.env.VITE_API_URL as string,
  authenticatedEntryPath: "/home",
  unAuthenticatedEntryPath: "/sign-in",
  tourPath: "/",
  locale: "ro",
  enableMock: true,
};

export default appConfig;
