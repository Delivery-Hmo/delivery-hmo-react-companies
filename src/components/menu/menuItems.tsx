import { DollarCircleOutlined, UserOutlined, SettingOutlined, ShopOutlined, LogoutOutlined, AuditOutlined} from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { MdOutlineDeliveryDining } from 'react-icons/md';


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
    key: '/vendedores',
    title: '',
    label: <Link to="/vendedores">Vendedores</Link>,
    icon: <DollarCircleOutlined style={styleIcon} />
  },
  {
    key: '/repartidores',
    title: '',
    label: <Link to="/repartidores">Repartidores</Link>,
    icon: <MdOutlineDeliveryDining style={styleIcon} />
  },
  {
    key: '/configuracion',
    title: '',
    icon: <SettingOutlined style={styleIcon} />,
    label: 'Configuración',
    children: [
      {
        key: '/configuracion/perfil',
        title: '',
        icon: <AuditOutlined style={styleIcon} />,
        label: <Link to="/configuracion/perfil">Perfil</Link>,
      },
      {
        key: '/signOut',
        title: '',
        icon: <LogoutOutlined style={styleIcon} />,
        label: 'Cerrar sesión',
        onClick: async () => await signOut()
      }
    ]
  }
]

export default menuItems;
