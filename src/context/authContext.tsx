import { useEffect, useState, useContext, createContext, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import FullLoader from '../components/fullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../services';
import { auth } from '../firebaseConfig';
import { UserAdmin } from '../interfaces/user';
import { message } from "antd";

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

    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      setUser(user);

      if (!user) {
        setLoading(false);
        setUserAdmin(null);
        return;
      };

      try {
        const userAdmin = await get<UserAdmin>('userAdmin/getByUid?uid=' + user.uid, controller);

        setUserAdmin(userAdmin);
      } catch (error) {
        //este if hay que quitarlo en producción
        if(error instanceof Error && error.message === "Failed to execute 'fetch' on 'Window': The user aborted a request.") {
          return;
        }

        setUserAdmin(null);
        setUser(null);

        console.log(error);
        message.error('Error, no se pudo obtener la información del usuario.');
        await auth.signOut();
      } finally {
        setLoading(false);
      }
    })

    return () => {
      uns();
      controller.abort();
    }
  }, [creatingUser])

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userAdmin, setUserAdmin, loading, setCreatingUser }}>{children}</AuthContext.Provider>;
s}

export const useAuth = () => useContext(AuthContext);