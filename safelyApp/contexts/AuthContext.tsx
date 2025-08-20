import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; 

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isRegistering: boolean; 
  setIsRegistering: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isRegistering: false,
  setIsRegistering: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isRegistering, setIsRegistering }}>
      {children}
    </AuthContext.Provider>
  );
};
