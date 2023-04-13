import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import Drawer from './drawer';

const { Header: _Header } = Layout;

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };


  return (
    <>
      <_Header style={{backgroundColor:'#CF9F29'}}>
        <Button onClick={showDrawer} type="primary" style={{ top: "5px", right: "34px" }} icon={<BarsOutlined style={{ fontSize: "140%", marginTop: "8%" }} />} size="large" />
      </_Header>
      <Drawer open={open} onClose={showDrawer}/>
    </>
  );
};

export default Header;
