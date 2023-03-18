import { FC } from 'react';
import { Drawer } from 'antd';
import RowHeader from './row';

interface DrawerI {
  open: boolean;
  onClose: () => void;
}

const DrawerD: FC<DrawerI> = ({ open, onClose }) => {

  return (
    <Drawer placement="right" onClose={onClose} open={open}>
      <RowHeader collapsed={false} style={{ marginLeft: "7%", color: "black" }} styleAvatar={{ backgroundColor: "#87D068" }} />
    </Drawer>
  );
};

export default DrawerD;