import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuComponent from '../../components/menu';
import Breadcrumb from '../../components/breadcrumb';
import HeaderComponent from '../../components/header';

const blockedPathsWithoAuthentication = ["/registrarse", "/"];

const RoterChecker = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user && (pathname !== "/" && pathname !== "/registrarse")) {
      navigate('/');
      return;
    }

    if(user && blockedPathsWithoAuthentication.includes(pathname)) {
      navigate('/sucursales');
    }
  }, [user, pathname, navigate])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      { user ? <MenuComponent /> : <HeaderComponent /> }
      <Layout.Content style={{ padding: user ? "5vh" : 0 }}>
        <Breadcrumb />
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;
