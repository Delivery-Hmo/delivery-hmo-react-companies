import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import FullLoader from "../components/FullLoader/FullLoader";
import { User, onIdTokenChanged, getAuth } from "firebase/auth";

const AuthContext = createContext<{ user: User | null }>({
  user: null
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const uns = onIdTokenChanged(getAuth(), async (user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      uns();
    };
  }, []);

  if(loading) return <FullLoader />;

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);