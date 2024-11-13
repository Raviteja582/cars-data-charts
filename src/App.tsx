import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import LandingPage from "layouts/landingPage";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="user/*" element={<AdminLayout />} />
      <Route path="basic/*" element={<LandingPage />} />
      <Route path="/" element={<Navigate to="/basic" replace />} />
    </Routes>
  );
};

export default App;
