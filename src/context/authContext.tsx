import { useEffect, useState, useContext, createContext, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import FullLoader from '../components/fullLoader';
import { User, onIdTokenChanged } from 'firebase/auth';
import { get } from '../services';
import { auth } from '../firebaseConfig';
import { BranchOffice, UserAdmin } from '../interfaces/user';
import { message } from "antd";
import { Rols, Users } from "../types";
import { sleep } from "../utils/functions";

interface Auth {
  user: User | null;
  userAuth: Users | null;
  setUserAuth: Dispatch<SetStateAction<UserAdmin | null>>;
  loading: boolean;
  creatingUser: Boolean;
  setCreatingUser: Dispatch<SetStateAction<Boolean>>;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({
  user: null,
  userAuth: null,
  setUserAuth: () => {},
  loading: true,
  creatingUser: false,
  setCreatingUser: () => false
});

const getUserDatas: Record<Rols, (uid: string, controller: AbortController) => Promise<Users>> = {
  "": () => Promise.reject('Error, no se pudo obtener la información del usuario.'),
  "Administrador": (uid: string, controller: AbortController) => get<UserAdmin>('userAdmin/getByUid?uid=' + uid, controller),
  "Administrador sucursal": (uid: string, controller: AbortController) => get<BranchOffice>('branchOffice/getByUid?uid=' + uid, controller),
  "Vendedor": (uid: string, controller: AbortController) => Promise.reject('Error, no se pudo obtener la información del usuario.'),
  "Repartidor": (uid: string, controller: AbortController) => Promise.reject('Error, no se pudo obtener la información del usuario.'),
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAuth, setUserAuth] = useState<Users | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [creatingUser, setCreatingUser] = useState<Boolean>(false);

  useEffect(() => {
    if (creatingUser) return;

    const controller = new AbortController();
    const uns = onIdTokenChanged(auth, async (user: User | null) => {
      setUser(user);

      if (!user) {
        setLoading(false);
        setUserAuth(null);
        return;
      };

      try {
        const userAdmin = await getUserDatas[(user?.displayName || "") as Rols](user.uid, controller);

        setUserAuth({ ...userAdmin, email: user.email! });
      } catch (error) {
        //este if hay que quitarlo en producción
        if(error instanceof Error && error.message === "Failed to execute 'fetch' on 'Window': The user aborted a request.") {
          return;
        }

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
      controller.abort();
    }
  }, [creatingUser]);

  if (loading) return <FullLoader />;

  return <AuthContext.Provider value={{ user, userAuth, setUserAuth, loading, creatingUser, setCreatingUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);