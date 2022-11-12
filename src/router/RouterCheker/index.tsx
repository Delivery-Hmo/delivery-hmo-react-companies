import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuComponent from '../../components/Menu';
import HeaderComponent from '../../components/Header';

const RoterChecker = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && pathname !== '/') {
      navigate('/');
      return;
    }

    if (user && pathname === '/') {
      navigate('/sucursales');
    }
  }, [user, pathname, navigate])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      { user ? <MenuComponent /> : <HeaderComponent /> }
      <Layout.Content style={{ padding: user ? 80 : 0 }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;
