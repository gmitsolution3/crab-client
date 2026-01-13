"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      setUser({
        id: res.data.data.id,
        name: `${res.data.data.firstName} ${res.data.data.lastName}`,
        email: res.data.data.email,
        role: res.data.data.role,
        phone: res.data.data.phone,
      });
    } catch (err: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        refetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
