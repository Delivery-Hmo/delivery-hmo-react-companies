import { PathRouteProps } from 'react-router-dom';
import Branches from '../views/Branches';
import LandingPage from '../views/LandingPage';
import Profile from '../views/Profile';

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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;
