import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Login = React.lazy(() => import('../component/AppComponent/Login/Component'));
const Register = React.lazy(() => import('../component/AppComponent/Register/Component'));
const Dashboard = React.lazy(() => import('../component/AppComponent/Dashboard/Component'));
const NotFound = React.lazy(() => import('../component/SharedComponent/NotFound/Component.js'));
const Logout = React.lazy(() => import('../component/AppComponent/Logout/Component.js')); // Lazy load Logout
const Loader = React.lazy(() => import('../component/SharedComponent/Loader/Component'));
const ProtectedRoute = React.lazy(() => import('../component/SharedComponent/ProtectedRoute/Component.js'));

const RouteIndex = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* If no authKey, render Login or Register, otherwise redirect to Dashboard */}
      <Route path="/" element={<ProtectedRoute element={Login} isProtected={false} />} />
      <Route path="/register" element={<ProtectedRoute element={Register} isProtected={false} />} />

      {/* Protected Routes - Only accessible if authKey is found */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={Dashboard} />}
      />

      {/* Logout Route */}
      <Route path="/logout" element={<Logout />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default RouteIndex;
