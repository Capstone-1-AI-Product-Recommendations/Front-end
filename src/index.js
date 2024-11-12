import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="179862988816-1s9cpk10ghdi7uk6ctneohb22li39us5.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
</GoogleOAuthProvider>
);
