import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "context/UserContext";

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

export default App;