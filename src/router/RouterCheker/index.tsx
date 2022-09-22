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
    if(!user && pathname !== "/login") {
      navigate('/login');   
      return;
    }

    if(user && pathname === '/login') {
      navigate('/');
    }
  }, [user, pathname, navigate]);
  
  return (
    <Layout style={{minHeight: "100vh"}}>
      { user && <MenuComponent /> }
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default RoterChecker;