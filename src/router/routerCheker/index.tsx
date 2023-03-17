import { Layout } from 'antd';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import MenuComponent from '../../components/menu';
import Breadcrumb from '../../components/breadcrumb';
import HeaderComponent from '../../components/header';
import FullLoader from "../../components/fullLoader";

const blockedPathsWithoAuthentication = ["/registrarse", "/"];

const RoterChecker = () => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;

    if(!user && (pathname !== "/" && pathname !== "/registrarse")) {
      navigate('/');
      return;
    }

    if(user && blockedPathsWithoAuthentication.includes(pathname)) {
      navigate('/sucursales');
    }
  }, [user, pathname, navigate, loading])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      { user ? <MenuComponent /> : <HeaderComponent /> }
      <Layout.Content style={{ padding: user ? "2vh" : 0 }}>
      { user && <Breadcrumb /> }
       <Suspense fallback={<FullLoader />}>
          <Outlet />
        </Suspense>
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;