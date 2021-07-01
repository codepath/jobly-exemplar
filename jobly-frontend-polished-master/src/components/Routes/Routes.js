import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Navigation,
  CompaniesPage,
  JobsPage,
  NotFoundPage,
  LoginPage,
  SignupPage,
  ProfilePage,
  ProtectedRoute
} from "components";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/companies"
          element={<ProtectedRoute element={CompaniesPage} />}
        />
        <Route path="/jobs" element={<ProtectedRoute element={JobsPage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={ProfilePage} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
