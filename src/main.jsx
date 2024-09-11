import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router.jsx";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </Provider>
);
