import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../usercontext';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useUser();
  const isAuthenticated = true; // 認証ロジックをここに追加

  return user.id ? children : <Navigate to="/login" />;
};

export default PrivateRoute;