import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from "firebase/auth";

type RegisterData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  personalizedNotifications: boolean;
  contactsShared: boolean;
  user?: User;
};

type RegisterContextType = {
  registerData: RegisterData;
  setRegisterData: (data: Partial<RegisterData>) => void;
};

// Default values
const defaultValues: RegisterData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  personalizedNotifications: true,
  contactsShared: false,
  user: undefined,
};

// Create context
const RegisterContext = createContext<RegisterContextType>({
  registerData: defaultValues,
  setRegisterData: () => {},
});

// Custom hook to use the context
export const useRegisterContext = () => useContext(RegisterContext);

// Create provider
export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [registerData, setRegisterDataState] = useState<RegisterData>(defaultValues);

  const setRegisterData = (data: Partial<RegisterData>) => {
    setRegisterDataState(prev => ({ ...prev, ...data }));
  };

  return (
    <RegisterContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};
