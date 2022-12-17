import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/branches';
import CreateBranch from '../views/branches/create';
import LandingPage from '../views/landingPage';
import SingUp from '../views/singUp';
import UserBranchOfficeSeller from '../views/userBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/userBranchOfficeSeller/create';
import Profile from '../views/profile';

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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;