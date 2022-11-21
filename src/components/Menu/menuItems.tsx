import { UserOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const signOut = () => getAuth().signOut();

const styleIcon = {
  fontSize: 20
};

const menuItems = [
  {
    key: '/sucursales',
    title: '',
    label: <Link to="/sucursales">Sucursales</Link>,
    icon: <ShopOutlined style={styleIcon} />
  },
  {
    key: '/usuarios',
    title: '',
    label: <Link to="/usuarios">Usuarios</Link>,
    icon: <UserOutlined style={styleIcon} />
  },
  {
    key: '/sub1',
    title: '',
    icon: <SettingOutlined style={styleIcon} />,
    label: 'Configuración',
    children: [
      {
        key: '/signOut',
        title: '',
        icon: <UserOutlined style={styleIcon} />,
        label: 'Cerrar sesión',
        onClick: async () => await signOut()
      }
    ]
  }
]

export default menuItems;
