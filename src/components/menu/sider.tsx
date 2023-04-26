import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import menuItems from './menuItems';
import RowHeader from './rowHeader';

const { Sider: SiderAnt } = Layout;

const Sider = () => {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);
  const location = useLocation();

  const onCollapse = (collapsed: boolean | undefined) => setCollapsed(collapsed);

  return (
    <SiderAnt
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <br />
      <RowHeader collapsed={collapsed} />
      <Menu
        style={{ marginTop: 20 }}
        theme="dark"
        selectedKeys={["/" + location.pathname.split("/")[1]]}
        items={menuItems}
      />
    </SiderAnt>
  )
}

export default Sider;
