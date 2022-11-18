import { useEffect, useState, useContext, createContext, FC, ReactNode } from 'react';
import FullLoader from '../components/FullLoader/FullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../service';
import { UserAdmin } from '../interfaces/userAdmin';
import { auth } from '../firebaseConfig';

interface Auth {
  user: User | null;
  userAdmin: UserAdmin | null;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({
  user: null,
  userAdmin: null
});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAdmin, setUserAdmin] = useState<UserAdmin | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const userAdmin: UserAdmin = await get('userAdmin/getByUid?uid=' + user.uid, controller);

          setUserAdmin(userAdmin);
        } catch (error) {
          console.log(error);
        }
      }

      setUser(user);
      setLoading(false);
    })

    return () => {
      uns();
      controller.abort();
    }
  }, [])

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userAdmin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
