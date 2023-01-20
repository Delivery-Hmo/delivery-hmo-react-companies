import { useEffect, useState, useContext, createContext, FC, ReactNode, Dispatch } from 'react';
import FullLoader from '../components/fullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../services';
import { auth } from '../firebaseConfig';
import { UserAdmin } from '../interfaces/user';

interface Auth {
  user: User | null;
  userAdmin: UserAdmin | null;
  setUserAdmin: Dispatch<React.SetStateAction<UserAdmin | null>>
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({
  user: null,
  userAdmin: null,
  setUserAdmin: () => {},
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

  return <AuthContext.Provider value={{ user, userAdmin, setUserAdmin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);