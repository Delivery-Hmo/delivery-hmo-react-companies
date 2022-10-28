import { PathRouteProps } from 'react-router-dom'
import Branches from '../views/Branches'
import LandingPage from '../views/LandingPage'

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
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes
