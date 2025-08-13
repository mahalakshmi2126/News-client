// import React from "react";
// import Routes from "./Routes";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { UserProvider } from "context/UserContext";
// import { HelmetProvider } from 'react-helmet-async';

// const App = () => (
//   <HelmetProvider>
//     <UserProvider>
//       <Routes />
//       <ToastContainer position="top-right" autoClose={2000} />
//     </UserProvider>
//   </HelmetProvider>
// );

// export default App;


import React, { useEffect } from 'react';
import { requestFirebaseNotificationPermission } from './firebaseNotification'; 
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes  from './Routes';

const App = () => {
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then(token => {
        if (token) {
          // Save token to backend here or via context
          console.log('Notification permission granted & token:', token);
        }
      });
  }, []);

  return (
    // existing code
    <HelmetProvider>
      <UserProvider>
        <Routes />
        <ToastContainer position="top-right" autoClose={2000} />
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;