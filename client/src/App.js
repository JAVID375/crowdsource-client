import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitizenLogin from "./pages/CitizenLogin";
import OfficialLogin from "./pages/OfficialLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import Register from "./pages/RegistrationPage";
import ReportIssue from "./pages/ReportIssue";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/official-login" element={<OfficialLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        
        {/* Protected Routes */}
        <Route
          path="/citizen-dashboard"
          element={
            <PrivateRoute role="citizen">
              <CitizenDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/official-dashboard"
          element={
            <PrivateRoute role="official">
              <OfficialDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/report-issue"
          element={
            <PrivateRoute role="citizen">
              <ReportIssue />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
