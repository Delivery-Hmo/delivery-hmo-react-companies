import { useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import { UserSeller } from '../../interfaces/user';
import HeaderView from "../../components/headerView";
import Table from "../../components/table";
import CachedImage from "../../components/cachedImage";

const UserSellersView = () => {
  const columns: ColumnsType<UserSeller> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' }, 
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    {
      title: "Foto",
      dataIndex: "photo",
      key: "photo",
      render: (_, userSeller: UserSeller) => (
        <CachedImage 
          style={{ width: 70, height: 70, objectFit: "cover" }}
          imageUrl={userSeller.image as string}
        />
      )
    }
  ], [])

  return (
    <div>
      <HeaderView  
        title="Vendedores"
        path="/vendedores/registrar"
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

export default UserSellersView;