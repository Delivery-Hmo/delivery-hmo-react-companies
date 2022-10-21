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

const styleIcon = {
  fontSize: 20
}

const menuItems: MenuItems[] = [
  {
    key: '/',
    title: 'Sucursales',
    label: <Link to="/">Sucursales</Link>,
    icon: <MdStore style={styleIcon} />
  },
  {
    key: '/usuarios',
    title: 'Usuarios',
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <UserOutlined style={styleIcon} />
  },
  {
    key: '/sub1',
    title: 'Configuración',
    icon: <SettingOutlined style={styleIcon} />,
    isSubMenu: true,
    label: 'Configuración',
    childrens: [
      {
        key: '1',
        title: 'Cerrar sesión',
        icon: <UserOutlined style={styleIcon} />,
        label: 'Cerrar sesión',
        onClick: async () => await signOut()
      }
    ]
  }
]

export default menuItems
