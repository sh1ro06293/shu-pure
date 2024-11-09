import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// ユーザー情報の型定義
interface User {
  id: number | null;
  name: string;
  email: string;
}

// デフォルトユーザー情報
const defaultUser: User = {
  id: null,
  name: '',
  email: '',
};

// Contextの作成
interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Providerコンポーネントの作成
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// useUserカスタムフックの作成
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
