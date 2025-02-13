import React from 'react';
import {  useNavigate } from 'react-router-dom'; // For redirecting to the login page

// Lazy loading DepartmentCrud component
const DepartmentCrud = React.lazy(() => import('../DepartmentCrud/Create/Component'));

const Component = () => {
  const history = useNavigate();

  // Handle logout
  const handleLogout = () => {
    history('/logout'); // Redirect to the login page
  };

  return (
    <>
      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>

      <React.Suspense fallback={<div>Loading...</div>}>
        <DepartmentCrud /> {/* Lazy loaded DepartmentCrud */}
      </React.Suspense>
    </>
  );
}

export default Component;
