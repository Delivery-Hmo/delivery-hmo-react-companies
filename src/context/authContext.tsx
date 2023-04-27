import { useEffect, useState, useContext, createContext, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import FullLoader from '../components/fullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../services';
import { auth } from '../firebaseConfig';
import { UserAdmin } from '../interfaces/user';

interface Auth {
  user: User | null;
  userAdmin: UserAdmin | null;
  setUserAdmin: Dispatch<SetStateAction<UserAdmin | null>>;
  loading: boolean;
  setCreatingUser: Dispatch<SetStateAction<Boolean>>;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({
  user: null,
  userAdmin: null,
  setUserAdmin: () => {},
  loading: true,
  setCreatingUser: () => false
});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAdmin, setUserAdmin] = useState<UserAdmin | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [creatingUser, setCreatingUser] = useState<Boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const uns = onIdTokenChanged(auth, async (_user: User | null) => {
      if (_user && !creatingUser) {
        try {
          const userAdmin = await get<UserAdmin>('userAdminPublic/getByUid?uid=' + _user.uid, controller);

          setUserAdmin(userAdmin);
        } catch (error) {
          console.log(error);
        }
      }

      setUser(_user);
      setLoading(false);
    })

    return () => {
      uns();
      controller.abort();
    }
  }, [creatingUser])

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userAdmin, setUserAdmin, loading, setCreatingUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);