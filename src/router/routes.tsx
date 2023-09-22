import { lazy } from "react";
import { PathRouteProps } from 'react-router-dom';
import DashborachBranch from "../views/dashbordBranch";

const Branches = lazy(() => import('../views/branches'));
const CreateBranch = lazy(() => import('../views/branches/create'));
const LandingPage = lazy(() => import('../views/landingPage'));
const SingUp = lazy(() => import('../components/header/singUp'));
const UserSeller = lazy(() => import('../views/userSellers'));
const CreateuserSeller = lazy(() => import('../views/userSellers/create'));
const Profile = lazy(() => import('../views/profile'));
const UserDeliveryMan = lazy(() => import('../views/userDeliveryMan'));
const CreateuserDeliveryMan = lazy(() => import('../views/userDeliveryMan/create'));
const Product = lazy(() => import('../views/products'));
const DashbordBranch = lazy(() => import('../views/dashbordBranch'));

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
    path: '/panel-sucursal',
    element: <DashborachBranch />
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
    path: '/productos',
    element: <Product />,
  },
  {
    path: '/productos/registrar',
    element: <Product />
  },
  {
    path: '/estadisticas',
    element: <DashbordBranch />,
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