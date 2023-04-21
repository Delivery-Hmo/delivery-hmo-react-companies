import { useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import { UserSeller } from '../../interfaces/user';
import HeaderView from "../../components/headerView";
import Table from "../../components/table";

const UserSellerView = () => {
  const columns: ColumnsType<UserSeller> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' }, 
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
  ], [])

  return (
    <div>
      <HeaderView  
        title="Vendedores"
        path="/vendedores/crear"
      />      
      <Table 
        url="userSeller/listByUserAdmin"
        columns={columns}
        placeholderSearch="Buscar por nombre, correo ó teléfono..."
        pathEdit="/vendedores/editar"
        urlDisabled="userSeller/disable"
      />
    </div>
  )
}

export default UserSellerView;