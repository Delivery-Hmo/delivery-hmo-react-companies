import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuComponent from '../../components/Menu';

const RoterChecker = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user && pathname !== "/home") { // regresar login para poder loguearse
      navigate('/home');
      return;
    }

    if(user && pathname === '/home') {
      navigate('/');
    }
  }, [user, pathname, navigate]);
  
  return (
    <Layout style={{minHeight: "100vh"}}>
      { user && <MenuComponent /> }
      <Layout.Content style={{padding: 80}}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;