// context/AuthProvider.tsx
'use client'
import { login } from "@/apis/auth.api";
import { Role } from "@/constants/role";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { notification } from "antd";
import React, { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";


export const AuthContext = React.createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useRouter();

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setToken = useAuthStore((state) => state.setToken);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setProfile = useAuthStore((state) => state.setProfile);
  const profile = useAuthStore((state) => state.profile);

  const logIn = async (payload: any) => {
    setIsLoading(true);
    try {
      const { data: profile, token }: any = await login(payload);
      const { password, ...rest } = profile;

      setToken(token);
      setProfile(rest);
      setLoggedIn(true);

      setIsLoading(false);
      notification.success({
        message: "Login successfully!",
        duration: 0.25,
        onClose: () =>
          profile.role === Role.CUSTOMER
            ? navigate.push("/")
            : profile.role === Role.ADMIN
            ? navigate.push("/")
            : profile.role === Role.STAFF
            ? navigate.push("/delivery/order-management")
            : null,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
