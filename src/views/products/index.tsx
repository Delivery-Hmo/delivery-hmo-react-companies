import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';
import CachedImage from "../../components/cachedImage";
import { Company } from '../../interfaces';
import { where } from 'firebase/firestore';

const Companies = () => {
  const columns: ColumnsType<Company> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Celular', dataIndex: 'phone', key: 'phone' },
    {
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      render: (_, company: Company) => (
        <CachedImage
          style={{ width: 70, height: 70, objectFit: "cover" }}
          imageUrl={company.image as string}
        />
      )
    },
    { title: 'Dirección', dataIndex: 'address', key: 'address' }
  ], [])

  return (
    <div style={{ margin: 20 }}>
      <HeaderView
        title="Empresas"
        path="/empresas/registrar"
      />
      <Table
        url="Companies"
        columns={columns}
        placeholderSearch="Buscar por nombre ó correo..."
        pathEdit="/empresas/editar"
        urlDisabled="empresas/disable"
        collection="Companies"
        query={[where("disable", "==", false)]}
      />
    </div>
  )
}

export default Companies;