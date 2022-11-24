import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Layout, Menu, Row } from 'antd';
import menuItems from './menuItems';
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;

const MenuComponent = () => {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);
  const location = useLocation();
  const { userAdmin } = useAuth();

  const onCollapse = (collapsed: boolean | undefined) => setCollapsed(collapsed);
  
  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={onCollapse}
    >
      <br />
      <Row 
        justify="center" 
        style={{margin: 15, textAlign: "center"}}
      >
        <Avatar size={collapsed ? 48 : 64} icon={<UserOutlined />} />
        { 
          !collapsed && <div style={{color: "white"}}>
            <div style={{marginTop: 20}}>
              { userAdmin?.email }
            </div>
            <div>
              { userAdmin?.role }
            </div>
          </div>
        }
      </Row>
      <Menu
        theme="dark"
        selectedKeys={["/" + location.pathname.split("/")[1]]}
        items={menuItems}
      />
    </Sider>
  )
}

export default MenuComponent;
