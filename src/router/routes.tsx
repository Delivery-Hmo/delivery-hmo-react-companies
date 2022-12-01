import { PathRouteProps } from 'react-router-dom';
<<<<<<< .merge_file_GWL3WS
import Branches from '../views/branches';
import CreateBranch from '../views/branches/CreateBranch';
import LandingPage from '../views/landingPage';
import Profile from '../views/profile';
import UserBranchOfficeSeller from '../views/userBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/userBranchOfficeSeller/createUserBranchOfficeSeller';
=======
import Branches from '../views/Branches';
import CreateBranch from '../views/Branches/CreateBranch';
import LandingPage from '../views/LandingPage';
import UserBranchOfficeSeller from '../views/UserBranchOfficeSeller';
import CreateUserBranchOfficeSeller from '../views/UserBranchOfficeSeller/CreateUserBranchOfficeSeller';
>>>>>>> .merge_file_cvbc2S

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
