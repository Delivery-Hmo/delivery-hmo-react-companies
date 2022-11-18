import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/Branches';
import CreateBranch from '../views/Branches/CreateBranch';
import LandingPage from '../views/LandingPage';
import UserBranchOfficeSeller from '../views/UserBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/UserBranchOfficeSeller/CreateUserBranchOfficeSeller';

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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;
