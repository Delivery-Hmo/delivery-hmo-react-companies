import { lazy } from "react";
import { PathRouteProps } from 'react-router-dom';
const Branches =  lazy(() => import('../views/branches'));
const CreateBranch =  lazy(() => import('../views/branches/create'));
const LandingPage =  lazy(() => import('../views/landingPage'));
const SingUp =  lazy(() => import('../views/singUp'));
const UserBranchOfficeSeller =  lazy(() => import('../views/userBranchOfficeSeller'));
const CreateUserBranchOfficeSeller =  lazy(() => import('../views/userBranchOfficeSeller/create'));
const Profile =  lazy(() => import('../views/profile'));
const UserBranchOfficeDeliveryMan =  lazy(() => import('../views/userBranchOfficeDeliveryMan'));
const CreateUserBranchOfficeDeliveryMan =  lazy(() => import('../views/userBranchOfficeDeliveryMan/create'));

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
    path: '/sucursales/crear',
    element: <CreateBranch />
  },
  {
    path: '/sucursales/editar',
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
    path: '/registrarse',
    element: <SingUp />,
  },
  {
    path: '/repartidores',
    element: <UserBranchOfficeDeliveryMan />,
  },
  {
    path: '/repartidores/crear',
    element: <CreateUserBranchOfficeDeliveryMan />
  },
  {
    path: 'repartidores/editar',
    element: <CreateUserBranchOfficeDeliveryMan />
  },
  {
    path: '*',
    element: <div>404 not found</div>
  }
]

export default routes;