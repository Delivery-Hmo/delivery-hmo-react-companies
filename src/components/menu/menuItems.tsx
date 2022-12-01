import { DollarCircleOutlined, UserOutlined, SettingOutlined, ShopOutlined, LoginOutlined, SolutionOutlined } from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const signOut = () => getAuth().signOut();

const styleIcon = {
  fontSize: 20
};

export const menuItems = [
  {
    key: '/sucursales',
    title: '',
    label: <Link to="/sucursales">Sucursales</Link>,
    icon: <ShopOutlined style={styleIcon} />
  },
  {
    key: '/vendedores',
    title: '',
    label: <Link to="/vendedores">Vendedores</Link>,
    icon: <DollarCircleOutlined style={styleIcon} />
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
        key: '/perfil',
        title: '',
        icon: <SolutionOutlined style={styleIcon} />,
        label: <Link to="/perfil">Perfil</Link>,
      },
      {
        key: '/signOut',
        title: '',
        icon: <LoginOutlined style={styleIcon} />,
        label: 'Cerrar sesión',
        onClick: async () => await signOut()
      }
    ]
  }
]

export default menuItems;
