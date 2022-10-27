<<<<<<< HEAD
import { UserOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const signOut = () => getAuth().signOut();
=======
import { UserOutlined, SettingOutlined } from '@ant-design/icons'
import { getAuth } from 'firebase/auth'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MdStore } from 'react-icons/md'

interface MenuItems {
  key: string;
  icon: ReactNode;
  title: string;
  label?: ReactNode | string;
  isSubMenu?: boolean;
  childrens?: MenuItems[];
  onClick?: () => void
}
const signOut = () => getAuth().signOut()
>>>>>>> dev

const styleIcon = {
  fontSize: 20
};

const menuItems: ItemType[] = [
  {
<<<<<<< HEAD
    key: "/sucursales",
    title: "",
    label: <Link to="/sucursales">Sucursales</Link>,
    icon: <ShopOutlined style={styleIcon} />
  },
  {
    key: "/usuarios",
    title: "",
=======
    key: '/',
    title: 'Sucursales',
    label: <Link to="/">Sucursales</Link>,
    icon: <MdStore style={styleIcon} />
  },
  {
    key: '/usuarios',
    title: 'Usuarios',
>>>>>>> dev
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <UserOutlined style={styleIcon} />
  },
  {
<<<<<<< HEAD
    key: "/sub1",
    title: "",
    icon: <SettingOutlined style={styleIcon} />,
    label: "Configuración",
    children: [
      {
        key: "/signOut",
        title: "",
=======
    key: '/sub1',
    title: 'Configuración',
    icon: <SettingOutlined style={styleIcon} />,
    isSubMenu: true,
    label: 'Configuración',
    childrens: [
      {
        key: '1',
        title: 'Cerrar sesión',
>>>>>>> dev
        icon: <UserOutlined style={styleIcon} />,
        label: 'Cerrar sesión',
        onClick: async () => await signOut()
      }
    ]
  }
]

export default menuItems
