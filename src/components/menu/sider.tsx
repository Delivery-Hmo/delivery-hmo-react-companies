import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import menuItems from './menuItems';
import RowHeader from './rowHeader';
import { useAuth } from "../../context/authContext";
import { bloquedPathsUsers } from "../../constants";

const { Sider: SiderAnt } = Layout;

const Sider = () => {
  const { loading, userAuth } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);
  const location = useLocation();

  const onCollapse = (collapsed: boolean | undefined) => setCollapsed(collapsed);

  const filteredMenuItems = useMemo(() => {
    if(loading || !userAuth) return [];

    const bloquedPaths = bloquedPathsUsers[userAuth.role];

    return menuItems.filter(m => !bloquedPaths.includes(m.key));
  }, [loading, userAuth]);

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
        items={filteredMenuItems}
      />
    </SiderAnt>
  )
}

export default Sider;
