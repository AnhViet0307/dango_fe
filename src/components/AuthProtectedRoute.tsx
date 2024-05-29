// components/AuthProtectedRoute.tsx
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Role } from "@/constants/role"; // Import your Role type definition

interface AuthProtectedRouteProps {
  children: ReactNode;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({ children }) => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/auth/login");
    }
  }, [loggedIn, profile, router]);

  return loggedIn ? <>{children}</> : null;
};

export default AuthProtectedRoute;
