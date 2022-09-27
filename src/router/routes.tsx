import { PathRouteProps } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';

const routes: PathRouteProps[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/ventas',
    element: <Home />,
  },
  {
    path: '*',
    element: <div>404 not found</div>,
  }
];

export default routes;