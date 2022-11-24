import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/branches';
import CreateBranch from '../views/branches/createBranch';
import LandingPage from '../views/landingPage';
import SingUp from '../views/singUp';
import UserBranchOfficeSeller from '../views/userBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/userBranchOfficeSeller/createUserBranchOfficeSeller';

const routes: PathRouteProps[] = [
  {
    path: '/',
    element: <LandingPage />
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
