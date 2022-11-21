import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/branches';
import CreateBranch from '../views/branches/createBranch';
import LandingPage from '../views/landingPage';

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
