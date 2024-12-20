// components/PrivateRoute.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '~/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated  = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // If the user is authenticated, render the children (the protected route component)
  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
