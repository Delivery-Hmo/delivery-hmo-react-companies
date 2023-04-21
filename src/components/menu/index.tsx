import { useState } from 'react';
import { Grid } from 'antd';
import Sider from './sider';
import Header from './header';

const { useBreakpoint } = Grid;

const MenuComponent = () => {
  const screens = useBreakpoint();

  return (
    screens.xs ? <Header /> : <Sider />
  )
}

export default MenuComponent;
