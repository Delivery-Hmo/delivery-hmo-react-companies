import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/Branches';
import CreateBranch from '../views/Branches/CreateBranch';
import LandingPage from '../views/LandingPage';
<<<<<<< .merge_file_Gc3ycv
<<<<<<< .merge_file_W5oALV
import Profile from '../views/Profile';
=======
import UserBranchOfficeSeller from '../views/UserBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/UserBranchOfficeSeller/CreateUserBranchOfficeSeller';
>>>>>>> .merge_file_BVw6QV
=======
import UserBranchOfficeSeller from '../views/UserBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/UserBranchOfficeSeller/CreateUserBranchOfficeSeller';
>>>>>>> .merge_file_iL2N9u

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
