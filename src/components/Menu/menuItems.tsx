import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { getAuth } from "firebase/auth";
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MdStore } from "react-icons/md";
import { ItemType } from 'antd/lib/menu/hooks/useItems';

interface MenuItems {
  key: string;
  icon: ReactNode;
  title: string;
  label?: ReactNode | string;
  isSubMenu?: boolean;
  childrens?: MenuItems[];
  onClick?: () => void
}
const signOut = () => getAuth().signOut();

const styleIcon = {
  fontSize: 20
};

const menuItems: ItemType[] = [
  {
    key: "/sucursales",
    title: "",
    label: <Link to="/sucursales">Sucursales</Link>,
    icon: <MdStore style={styleIcon} />
  },
  {
    key: "/usuarios",
    title: "",
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <UserOutlined style={styleIcon} />
  },
  {
    key: "/sub1",
    title: "",
    icon: <SettingOutlined style={styleIcon} />,
    label: "Configuración",
    children: [
      {
        key: "1",
        title: "",
        icon: <UserOutlined style={styleIcon} />,
        label: "Cerrar sesión",
        onClick: async () => await signOut()
      }
    ]
  }
];

export default menuItems;
