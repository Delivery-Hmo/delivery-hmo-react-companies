import { FC, useMemo } from 'react';
import { Drawer as DrawerAnt } from 'antd';
import { Menu, Card } from 'antd';
import menuItems from './menuItems';
import { useLocation } from 'react-router-dom';
import RowHeader from './rowHeader';
import { useAuth } from "../../context/authContext";
import { bloquedPathsUsers } from "../../constants";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<Props> = ({ open, onClose }) => {
  const { loading, userAuth } = useAuth();
  const location = useLocation();

  const filteredMenuItems = useMemo(() => {
    if(loading || !userAuth) return [];

    const bloquedPaths = bloquedPathsUsers[userAuth.role];

    return menuItems.filter(m => !bloquedPaths.includes(m.key));
  }, [loading, userAuth]);

  return (
    <DrawerAnt
      headerStyle={{ backgroundColor: '#CF9F29', color: "white" }}
      bodyStyle={{ backgroundColor: '#C8C8C8', color: "white" }}
      width="80%"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Card style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <RowHeader collapsed={false} />
        <Menu
          theme="dark"
          selectedKeys={["/" + location.pathname.split("/")[1]]}
          items={filteredMenuItems.map(m => {
            return { ...m, onClick: () => onClose() };
          })}
        />
      </Card>
    </DrawerAnt>
  );
};

export default Drawer;