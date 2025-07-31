// import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// import { useUser } from "context/UserContext";
// import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
// import ResetPasswordPage from './pages/user-authentication-login-register/ResetPasswordPage';
// import PersonalizedNewsDashboard from "pages/personalized-news-dashboard";
// import BookmarksReadingHistory from "pages/bookmarks-reading-history";
// import UserProfileSettings from "pages/user-profile-settings";
// import ArticleReadingView from "pages/article-reading-view";
// import AdminDashboard from "pages/admin-dashboard";
// import ReporterDashboard from "pages/reporter-dashboard";
// import NotFound from "pages/NotFound";
// import OnboardingForm from "pages/personalized-news-dashboard/components/OnboardingForm";

// const Routes = () => {
//   const { isAuthenticated } = useUser();

//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <ScrollToTop />
//         <RouterRoutes>
//           <Route
//             path="/"
//             element={<Navigate to="/personalized-news-dashboard" replace />}
//           />

//           <Route
//             path="/user-authentication-login-register"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/personalized-news-dashboard" replace />
//               ) : (
//                 <UserAuthenticationLoginRegister />
//               )
//             }
//           />
//           <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//           <Route
//             path="/personalized-news-dashboard"
//             element={
//               isAuthenticated ? (
//                 <PersonalizedNewsDashboard />
//               ) : (
//                 <Navigate to="/user-authentication-login-register" replace />
//               )
//             }
//           />
//           <Route
//             path="/personalized-news-dashboard/onboarding"
//             element={
//               isAuthenticated ? (
//                 <OnboardingForm />
//               ) : (
//                 <Navigate to="/user-authentication-login-register" replace />
//               )
//             }
//           />
//           <Route
//             path="/bookmarks-reading-history"
//             element={
//               isAuthenticated ? (
//                 <BookmarksReadingHistory />
//               ) : (
//                 <Navigate to="/user-authentication-login-register" replace />
//               )
//             }
//           />
//           <Route
//             path="/user-profile-settings"
//             element={
//               isAuthenticated ? (
//                 <UserProfileSettings />
//               ) : (
//                 <Navigate to="/user-authentication-login-register" replace />
//               )
//             }
//           />
//           <Route path="/article-reading-view" element={<ArticleReadingView />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/reporter-dashboard" element={<ReporterDashboard />} />
//           <Route path="*" element={<NotFound />} />
//         </RouterRoutes>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;


import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { useUser } from "context/UserContext";
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import ResetPasswordPage from './pages/user-authentication-login-register/ResetPasswordPage';
import PersonalizedNewsDashboard from "pages/personalized-news-dashboard";
import BookmarksReadingHistory from "pages/bookmarks-reading-history";
import UserProfileSettings from "pages/user-profile-settings";
import ArticleReadingView from "pages/article-reading-view";
import AdminDashboard from "pages/admin-dashboard";
import ReporterDashboard from "pages/reporter-dashboard";
import NotFound from "pages/NotFound";
import OnboardingForm from "pages/personalized-news-dashboard/components/OnboardingForm";

const Routes = () => {
  const { isAuthenticated } = useUser();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route
            path="/"
            element={<Navigate to="/personalized-news-dashboard" replace />}
          />
          <Route
            path="/user-authentication-login-register"
            element={
              isAuthenticated ? (
                <Navigate to="/personalized-news-dashboard" replace />
              ) : (
                <UserAuthenticationLoginRegister />
              )
            }
          />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route
            path="/personalized-news-dashboard"
            element={<PersonalizedNewsDashboard />}
          />
          <Route
            path="/personalized-news-dashboard/onboarding"
            element={
              isAuthenticated ? (
                <OnboardingForm />
              ) : (
                <Navigate
                  to={`/user-authentication-login-register?redirect=${encodeURIComponent(
                    "/personalized-news-dashboard/onboarding"
                  )}`}
                  replace
                />
              )
            }
          />
          <Route
            path="/bookmarks-reading-history"
            element={
              isAuthenticated ? (
                <BookmarksReadingHistory />
              ) : (
                <Navigate
                  to={`/user-authentication-login-register?redirect=${encodeURIComponent(
                    "/bookmarks-reading-history"
                  )}`}
                  replace
                />
              )
            }
          />
          <Route
            path="/user-profile-settings"
            element={
              isAuthenticated ? (
                <UserProfileSettings />
              ) : (
                <Navigate
                  to={`/user-authentication-login-register?redirect=${encodeURIComponent(
                    "/user-profile-settings"
                  )}`}
                  replace
                />
              )
            }
          />
          <Route path="/article-reading-view" element={<ArticleReadingView />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/reporter-dashboard" element={<ReporterDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;