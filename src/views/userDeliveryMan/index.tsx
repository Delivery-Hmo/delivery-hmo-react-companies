import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table';
import { UserDeliveryMan } from '../../interfaces/user';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';

const UserDeliveryManView = () => {
  const columns: ColumnsType<UserDeliveryMan> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Compañia', dataIndex: 'company', key: 'company' },
    { title: 'Sucursal', dataIndex: 'branchOffice', key: 'branchOffice' },
  ], [])

  return (
    <>
      <HeaderView
        path='/repartidores/crear'
        title='Repartidores'
      />
      <Table 
        url="userDeliveryMan/listByUserAdmin"
        columns={columns}
        placeholderSearch="Buscar por nombre, correo ó teléfono..."
        pathEdit="/repartidores/editar"
        urlDisabled="userDeliveryMan/disable"
      />
    </>
  )
}

export default UserDeliveryManView;
