
import dynamic from 'next/dynamic';

const AuthProvider = dynamic(() => import('@/context/AuthProvider'), { ssr: false });

const ClientOnlyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientOnlyAuthProvider;
