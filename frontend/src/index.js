import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import SuspenseContent from "./containers/SuspenseContent";
import reactQueryClient from "./utils/customReactQueryClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<SuspenseContent />}>
    <QueryClientProvider client={reactQueryClient}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </QueryClientProvider>
  </Suspense>
);
