import { useAuth } from '../../context/authContext';
import { BranchOffice } from '../../interfaces/branchOffice';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';

const Branches = () => {
  const { loading: loadingUser } = useAuth();

  const columns: ColumnsType<BranchOffice> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Meta ventas / mes', dataIndex: 'salesGoalByMonth', key: 'salesGoalByMonth' },
  ], [])

  return (
    <div>
      <HeaderView  
        title="Sucursales"
        path="/sucursales/crear"
      />      
      <Table 
        url="branchOffice/listByUserAdmin"
        columns={columns}
        wait={loadingUser}
        placeholderSearch="Buscar por nombre ó correo..."
        pathEdit="/sucursales/editar"
        urlDisabled="branchOffice/disable"
      />
    </div>
  )
}

export default Branches;