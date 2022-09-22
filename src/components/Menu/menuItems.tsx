import { UserOutlined, DollarOutlined, SettingOutlined } from '@ant-design/icons';
import { getAuth } from "firebase/auth";
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface MenuItems {
  key: string;
  icon: React.ReactNode;
  title: string;
  label?: React.ReactElement | string;
  isSubMenu?: boolean;
  childrens?: MenuItems[];
  onClick?: () => void
}
const signOut = () => getAuth().signOut();

const menuItems: MenuItems[] = [
  {
    key: "/",
    title: "Inicio",
    label: <Link to="/">Inicio</Link>,
    icon: <DollarOutlined />
  },
  {
    key: "/usuarios",
    title: "Usuarios",
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <UserOutlined />
  },
  {
    key: "/sub1",
    title: "Configuración",
    icon: <SettingOutlined />,
    isSubMenu: true,
    label: "Configuración",
    childrens: [
      {
        key: "1",
        title: "Cerrar sesión",
        icon: <UserOutlined />,
        label: "Cerrar sesión",
        onClick: async () => await signOut()
      }
    ]
  }
];

export default menuItems;
