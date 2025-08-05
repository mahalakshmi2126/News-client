import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "context/UserContext";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <>
    <UserProvider>
    <Routes />
    <ToastContainer position="top-right" autoClose={2000} />
    </UserProvider>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    {/* your existing routing logic */}
  </HelmetProvider>
);
export default App;