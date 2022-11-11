import { UserOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

const signOut = () => getAuth().signOut()

const styleIcon = {
  fontSize: 20
}

const menuItems: ItemType[] = [
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
        key: '/perfil',
        title: '',
        icon: <UserOutlined style={styleIcon} />,
        label: <Link to="/perfil">Perfil</Link>,
      },
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

export default menuItems
