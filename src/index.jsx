// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./styles/tailwind.css";
// import "./styles/index.css";

// import { GoogleOAuthProvider } from "@react-oauth/google";

// const container = document.getElementById("root");
// const root = createRoot(container);

// // ✅ Replace your root render like this:
// root.render(
// <GoogleOAuthProvider clientId="309905063949-l75i9qjja2dn5tus177q0252ihrdera0.apps.googleusercontent.com">
//   <App />
// </GoogleOAuthProvider>

// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(err => {
      console.log('Service Worker registration failed:', err);
    });
}

root.render(
  <GoogleOAuthProvider clientId="309905063949-l75i9qjja2dn5tus177q0252ihrdera0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);