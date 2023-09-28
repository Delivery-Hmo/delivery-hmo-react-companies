import { useEffect, useState, useContext, createContext, FC, ReactNode } from 'react';
import FullLoader from '../components/fullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../services';
import { auth } from '../firebaseConfig';
import { BranchOffice, UserAdmin } from '../interfaces/user';
import { message } from "antd";
import { DS, Rols, Users } from "../types";
import { sleep } from "../utils/functions";
import useAbortController from "../hooks/useAbortController";

interface Auth {
  user: User | null;
  userAuth: Users | null;
  setUserAuth: DS<Users | null>;
  loading: boolean;
  creatingUser: boolean;
  setCreatingUser: DS<boolean>;
}

interface Props {
  children: ReactNode;
}

type AC = AbortController;

const AuthContext = createContext<Auth>({
  user: null,
  userAuth: null,
  setUserAuth: () => { },
  loading: true,
  creatingUser: false,
  setCreatingUser: () => false
});

const getUserDatas: Record<Rols, (uid: string, controller: AC) => Promise<Users>> = {
  "Administrador": (uid: string, controller: AC) => get<UserAdmin>('userAdmin/getByUid?uid=' + uid, controller),
  "Administrador sucursal": (uid: string, controller: AC) => get<BranchOffice>('branchOffice/getByUid?uid=' + uid, controller),
  "Vendedor": (uid: string, controller: AC) => Promise.reject('Error, no se pudo obtener la información del usuario.'),
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAuth, setUserAuth] = useState<Users | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const abortController = useAbortController();

  useEffect(() => {
    if (creatingUser) return;

    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      setUser(user);

      if (!user) {
        setLoading(false);
        setUserAuth(null);
        return;
      };

      try {
        const _userAuth = await getUserDatas[(user?.displayName || "") as Rols](user.uid, abortController.current!);

        setUserAuth(_userAuth);
      } catch (error) {
        setUserAuth(null);
        setUser(null);

        console.log(error);
        message.error('Error, no se pudo obtener la información del usuario.');
        await auth.signOut();
      } finally {
        await sleep(500);
        setLoading(false);
      }
    })

    return () => {
      uns();
    }
  }, [creatingUser, abortController]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userAuth, setUserAuth, loading, creatingUser, setCreatingUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);