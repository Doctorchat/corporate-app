import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import { QueryClient, QueryClientProvider } from "react-query";

import "./locales";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <QueryClientProvider client={queryClient}>
              <Layout />
            </QueryClientProvider>
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
