import { useAuth } from '../../context/authContext';
import { BranchOffice } from '../../interfaces/branchOffice';
import { ColumnsType } from 'antd/es/table';
import TableActionsButtons from '../../components/tableActionsButtons';
import { useMemo } from 'react';
import { patch } from '../../services';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';

const Branches = () => {
  const { loading: loadingUser } = useAuth();

  const columns: ColumnsType<BranchOffice> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Meta ventas / mes', dataIndex: 'salesGoalByMonth', key: 'salesGoalByMonth' },
    {
      title: 'Acciones', dataIndex: 'actions', key: 'actions', width: '5%',
      render: (_, record) => (
        <TableActionsButtons
          record={record}
          onDeleted={() => {

          }}
          fun={() => patch(`branchOffice/disable`, { id: record.id })}
          messageError="Sucursal eliminada con éxito."
          pathEdit="/sucursales/editar"
        />
      ),
    },
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
      />
    </div>
  )
}

export default Branches;