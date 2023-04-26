import { FC } from 'react';
import { Drawer as DrawerAnt } from 'antd';
import { Menu, Card } from 'antd';
import menuItems from '../menuItems';
import { useLocation } from 'react-router-dom';
import RowHeader from '../rowHeader';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Drawer: FC<Props> = ({ open, onClose }) => {
  const location = useLocation();

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
          items={menuItems.map(m => {
            return { ...m, onClick: () => onClose() };
          })}
        />
      </Card>
    </DrawerAnt>
  );
};

export default Drawer;