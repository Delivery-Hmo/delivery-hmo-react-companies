import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';
import { Product } from '../../interfaces';

const Products = () => {
  const columns: ColumnsType<Product> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' }
  ], [])

  return (
    <div style={{ margin: 20 }}>
      <HeaderView
        title="Productos"
        path="/productos/registrar"
      />
      <Table
        apiName='products'
        url="products/list"
        columns={columns}
        placeholderSearch="Buscar por nombre ó correo..."
        pathEdit="/productos/editar"
        urlDisabled="productos/disable"
      />
    </div>
  )
}

export default Products;