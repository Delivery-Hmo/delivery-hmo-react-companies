import { PathRouteProps } from 'react-router-dom';
import Home from '../views/Home';
import LandingPage from '../views/LandingPage';

const routes: PathRouteProps[] = [
  {
    path: '/home',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <div>404 not found</div>,
  }
];

export default routes;