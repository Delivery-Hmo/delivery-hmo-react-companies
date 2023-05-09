import { Layout } from 'antd';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import MenuComponent from '../../components/menu';
import Breadcrumb from '../../components/breadcrumb';
import HeaderComponent from '../../components/header';
import FullLoader from "../../components/fullLoader";
import { Rols } from "../../types";

const blockedPathsWithoAuthentication = ["/registrarse", "/"];
const initUrlByRole: Record<Rols, string> = {
  "" : "/",
  "Administrador": "/sucursales",
  "Administrador sucursal": "/panel-sucursal",
  "Repartidor": "/pedidos-repartidor",
  "Vendedor": "/pedidos-sucursal"
};

const RoterChecker = () => {
  const { user, userAdmin, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user && (pathname !== "/" && pathname !== "/registrarse")) {
      navigate('/');
      return;
    }

    if (user && blockedPathsWithoAuthentication.includes(pathname)) {
      navigate(initUrlByRole[userAdmin!.role]);
    }
  }, [user, pathname, navigate, loading, userAdmin])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {user ? <MenuComponent /> : <HeaderComponent />}
      <Layout.Content style={{ padding: user ? "2vh" : 0 }}>
        {user && <Breadcrumb />}
        <Suspense fallback={<FullLoader />}>
          <Outlet />
        </Suspense>
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;