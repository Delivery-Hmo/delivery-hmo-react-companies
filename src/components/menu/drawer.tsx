import { FC } from 'react';
import { Drawer } from 'antd';
import { Menu, Avatar, Divider, Card, Layout } from 'antd';
import menuItems from './menuItems';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/authContext';
import { useLocation } from 'react-router-dom';

interface DrawerI {
  open: boolean;
  onClose: () => void;
}

const DrawerD: FC<DrawerI> = ({ open, onClose }) => {
  const location = useLocation();
  const { userAdmin } = useAuth();

  return (
    <Drawer
      headerStyle={{ backgroundColor: '#CF9F29', color: "white" }}
      bodyStyle={{ backgroundColor: '#C8C8C8', color: "white" }}
      width="80%"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Card style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <Avatar size={50} icon={<UserOutlined />} />
        <div style={{ marginTop: 20 }}><b>{userAdmin?.email.toUpperCase()}</b></div>
        <div> {userAdmin?.role} </div>
        <Divider />
        <Menu
          theme="dark"
          selectedKeys={["/" + location.pathname.split("/")[1]]}
          items={menuItems}
        />
      </Card>
    </Drawer>

  );
};

export default DrawerD;