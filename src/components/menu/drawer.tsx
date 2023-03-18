import React,{FC} from 'react';
import { Drawer } from 'antd';

interface DrawerI {
  open: boolean;
  onClose: () => void;
}

const DrawerD: FC<DrawerI>  = ({open, onClose}) => {
 
  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default DrawerD;