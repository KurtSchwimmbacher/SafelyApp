import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getUserProfile } from '../services/userService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  hasOnboarded: boolean | null;
  setHasOnboarded: (hasOnboarded: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && !isRegistering) {
        try {
          const profile = await getUserProfile(user.uid);
          setHasOnboarded(profile?.hasOnboarded ?? false);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setHasOnboarded(false);
        }
      } else {
        setHasOnboarded(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isRegistering]);

  return (
    <AuthContext.Provider value={{ user, loading, isRegistering, setIsRegistering, hasOnboarded, setHasOnboarded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};