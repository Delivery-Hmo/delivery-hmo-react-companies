import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/branches';
import CreateBranch from '../views/branches/CreateBranch';
import LandingPage from '../views/landingPage';
import Profile from '../views/profile';
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
    path: '/perfil',
    element: <Profile />
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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;
