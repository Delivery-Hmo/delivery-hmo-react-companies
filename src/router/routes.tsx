import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/branches';
import CreateBranch from '../views/branches/create';
import LandingPage from '../views/landingPage';
import SingUp from '../views/singUp';
import UserBranchOfficeSeller from '../views/userBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/userBranchOfficeSeller/create';
import Profile from '../views/profile';
import UserBranchOfficeDeliveryMan from '../views/userBranchOfficeDeliveryMan';
import CreateUserBranchOfficeDeliveryMan from '../views/userBranchOfficeDeliveryMan/create';

const routes: PathRouteProps[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/configuracion/perfil',
    element: <Profile />
  },
  {
    path: '/sucursales',
    element: <Branches />
  },
  {
    path: '/sucursales/crear',
    element: <CreateBranch />
  },
  {
    path: '/vendedores',
    element: <UserBranchOfficeSeller />
  },
  {
    path: '/vendedores/crear',
    element: <CreateUserBranchOfficeSeller />
  },
  {
    path: '/vendedores/editar',
    element: <CreateUserBranchOfficeSeller />
  },
  {
    path: '/registrarse',
    element: <SingUp />,
  },
  {
    path: '/repartidores',
    element: <UserBranchOfficeDeliveryMan />,
  },
  {
    path: '/repartidores/crear',
    element: <CreateUserBranchOfficeDeliveryMan />
  },
  {
    path: 'repartidores/editar',
    element: <CreateUserBranchOfficeDeliveryMan />
  },
  {
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;