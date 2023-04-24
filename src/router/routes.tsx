import { lazy } from "react";
import { PathRouteProps } from 'react-router-dom';
const Branches =  lazy(() => import('../views/branches'));
const CreateBranch =  lazy(() => import('../views/branches/create'));
const LandingPage =  lazy(() => import('../views/landingPage'));
const SingUp =  lazy(() => import('../views/singUp'));
const UserSeller =  lazy(() => import('../views/userSeller'));
const CreateuserSeller =  lazy(() => import('../views/userSeller/create'));
const Profile =  lazy(() => import('../views/profile'));
const UserDeliveryMan =  lazy(() => import('../views/userDeliveryMan'));
const CreateuserDeliveryMan =  lazy(() => import('../views/userDeliveryMan/create'));

const routes: PathRouteProps[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/configuracion/perfil',
    element: <Profile />
  },
  {
    path: '/sucursales',
    element: <Branches />
  },
  {
    path: '/sucursales/registrar',
    element: <CreateBranch />
  },
  {
    path: '/sucursales/editar',
    element: <CreateBranch />
  },
  {
    path: '/vendedores',
    element: <UserSeller />
  },
  {
    path: '/vendedores/registrar',
    element: <CreateuserSeller />
  },
  {
    path: '/vendedores/editar',
    element: <CreateuserSeller />
  },
  {
    path: '/registrarse',
    element: <SingUp />,
  },
  {
    path: '/repartidores',
    element: <UserDeliveryMan />,
  },
  {
    path: '/repartidores/registrar',
    element: <CreateuserDeliveryMan />
  },
  {
    path: 'repartidores/editar',
    element: <CreateuserDeliveryMan />
  },
  {
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;