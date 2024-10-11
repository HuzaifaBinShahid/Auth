import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the User interface
interface User {
  name: string;
}

// Define the UserContext type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Provide a default value with a null user and a dummy function for setUser
const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

// Create the UserContext with a default value
export const UserContext = createContext<UserContextType>(defaultUserContext);

// Create the UserProvider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Logic to fetch user data, e.g., from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
