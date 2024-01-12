import { useAuth } from '../../context/authContext';
import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table';
import { BranchOffice, UserDeliveryMan } from '../../interfaces/user';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';

const UserDeliveryManView = () => {
  const { loading: loadingUser } = useAuth();
  const columns: ColumnsType<UserDeliveryMan> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Sucursal',
      key: 'branchOffice',
      render: (_, { branchOffice }) => (branchOffice as BranchOffice)?.name || 'Sin sucursal',
    },
  ], [])

  return (
    <>
      <HeaderView
        path='/repartidores/registrar'
        title='Repartidores'
      />
      <Table
        url="userDeliveryMan/listByUserAdmin"
        columns={columns}
        wait={loadingUser}
        placeholderSearch="Buscar por nombre, correo ó teléfono..."
        pathEdit="/repartidores/editar"
        urlDisabled="userDeliveryMan/disable"
      />
    </>
  )
}

export default UserDeliveryManView;
