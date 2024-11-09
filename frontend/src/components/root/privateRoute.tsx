import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../usercontext';

// 認証状態を管理するためのコンポーネント
const PrivateRoute: React.FC = () => {
  const { user } = useUser();

  // ユーザー情報があるかどうかで認証状態を判断
  const isAuthenticated = !!user.id;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
