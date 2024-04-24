import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { Suspense, lazy } from "react";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import HomePage from "../pages/HomePage";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AppLayout = lazy(() => import("../pages/AppLayout"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup/:user" element={<Signup />} />
              <Route path="/login" element={<HomePage />} />
              <Route path="dashboard" element={<AppLayout />} />
              {/* <Route exact index element={<Navigate replace to="cities" />} />
                <Route exact path="cities" element={<CityList />} />
                <Route exact path="cities/:id" element={<City />} />
                <Route exact path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
