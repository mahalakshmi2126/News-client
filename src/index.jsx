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

import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Add this

const container = document.getElementById("root");
const root = createRoot(container);

// ✅ Replace your root render like this:
root.render(
  <GoogleOAuthProvider clientId="306293956343-64n7ehu5kj9fc5krvgiqnni8kq0q553n.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);