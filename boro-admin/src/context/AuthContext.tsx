// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, FC } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: any = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check local storage for token on initial load
    return localStorage.getItem('token') !== null;
  });

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/boro-api/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json(); // Assuming your API returns a token
    localStorage.setItem('token', data.token); // Store the token in local storage
    setIsAuthenticated(true); // Update the authentication state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Update the authentication state
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null); // Update the authentication state based on token presence
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
