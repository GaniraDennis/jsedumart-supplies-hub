import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("jsedumart_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string): boolean => {
    // Demo: admin@jsedumart.co.ke logs in as admin
    const isAdmin = email === "admin@jsedumart.co.ke";
    const u: User = {
      id: Date.now().toString(),
      name: isAdmin ? "Admin" : email.split("@")[0],
      email,
      isAdmin,
    };
    setUser(u);
    localStorage.setItem("jsedumart_user", JSON.stringify(u));
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const u: User = { id: Date.now().toString(), name, email, isAdmin: false };
    setUser(u);
    localStorage.setItem("jsedumart_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jsedumart_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.isAdmin ?? false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
