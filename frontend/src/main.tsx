import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@trussworks/react-uswds/lib/index.css";
import { store } from "./app/store.tsx";
import { Provider } from "react-redux";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
