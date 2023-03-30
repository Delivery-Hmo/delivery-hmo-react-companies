import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table';
import { UserBranchOfficeSeller } from '../../interfaces/user';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';

const UserBranchOfficeSellerView = () => {
  const columns: ColumnsType<UserBranchOfficeSeller> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' }, 
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
  ], [])

  return (
    <>
      <HeaderView
        path='/vendedores/crear'
        title='Vendedores'
      />
      <Table 
        url="userBranchOfficeSeller/listByUserAdmin"
        columns={columns}
        placeholderSearch="Buscar por nombre, correo ó teléfono..."
        pathEdit="/vendedores/editar"
        urlDisabled="userBranchOfficeSeller/disable"
      />
    </>
  )
}

export default UserBranchOfficeSellerView;