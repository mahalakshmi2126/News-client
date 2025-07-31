// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./styles/tailwind.css";
// import "./styles/index.css";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(<App />);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

// ✅ Replace your root render like this:
root.render(
<GoogleOAuthProvider clientId="309905063949-l75i9qjja2dn5tus177q0252ihrdera0.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>

);