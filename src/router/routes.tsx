import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/Branches';
import CreateBranch from '../views/Branches/CreateBranch';
import LandingPage from '../views/LandingPage';

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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;
