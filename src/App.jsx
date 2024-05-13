import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SpinnerFullPage from "../pages/SpinnerFullPage";
import Signin from "./features/login/Signin";
import Signup from "./features/login/Signup";
import HomePage from "./features/login/HomePage";
import ProtectedRoute from "./features/common/ProtectedRoute";
import LocationAccess from "../pages/LocationAccess";
import SignUpVerification from "../pages/SignUpVerification";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AppLayout = lazy(() => import("./features/common/AppLayout"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider>
        <ToastContainer autoClose={2000} />
        <HashRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Navigate replace to="/home" />} />
              <Route path="app/:action" element={<SignUpVerification />} />
              <Route path="home" element={<HomePage />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup/:user" element={<Signup />} />
              <Route
                path="locationAccess"
                element={
                  <ProtectedRoute>
                    <LocationAccess />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<HomePage />} />
              <Route
                path="dashboard/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
