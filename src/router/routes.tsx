import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/Branches';
import LandingPage from '../views/LandingPage';
import Seller from '../views/Seller';

const routes: PathRouteProps[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/sucursales',
    element: <Branches />,
  },
  {
    path: '/registrarse',
    element: <Seller />,
  },
  {
    path: '*',
    element: <div>404 not found</div>,
  }
];

export default routes;