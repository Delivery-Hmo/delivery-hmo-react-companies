import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import menuItems from './menuItems';
import RowHeader from './row';

const { Sider: _Sider } = Layout;

const Sider = () => {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);
  const location = useLocation();

  const onCollapse = (collapsed: boolean | undefined) => setCollapsed(collapsed);
  
  return (
    <_Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={onCollapse}
    >
      <br />
      <RowHeader collapsed={collapsed} />
      <Menu
        theme="dark"
        selectedKeys={["/" + location.pathname.split("/")[1]]}
        items={menuItems}
      />
    </_Sider>
  )
}

export default Sider;
