import { useEffect, useState, useContext, createContext, FC, ReactNode } from "react";
import FullLoader from "../components/FullLoader/FullLoader";
import { User, onIdTokenChanged, getAuth } from "firebase/auth";
import { get } from "../service/branchOffice";
import { UserAdmin } from "../interfaces/userAdmin";

interface Auth {
  user: User | null;
  userAdmin: UserAdmin | null;
}

const AuthContext = createContext<Auth>({
  user: null,
  userAdmin: null
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAdmin, setUserAdmin] = useState<UserAdmin | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    let mounted = true;

    const uns = onIdTokenChanged(getAuth(), async (user: User | null) => {
      if(user) {
        try {
          const userAdmin: UserAdmin = await get("userAdmin/getByUid?uid=" + user.uid);
  
          if(!mounted) return;

          setUserAdmin(userAdmin)
        } catch (error) {
          console.log(error);        
        }
      }
      
      if(!mounted) return;

      setUser(user);
      setLoading(false);
    });

    return () => {
      uns();
      mounted = false;
    };
  }, []);

  if (loading) return <FullLoader />

  return <AuthContext.Provider value={{user, userAdmin}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)
