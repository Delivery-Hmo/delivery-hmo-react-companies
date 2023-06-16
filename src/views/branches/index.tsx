import { useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import HeaderView from '../../components/headerView';
import Table from '../../components/table';
import { BranchOffice } from "../../interfaces/user";
import { Button } from 'antd';
import { CommentOutlined } from "@ant-design/icons";
import Comments from './comments';

const Branches = () => {
  const [open, setOpen] = useState(false);

  const columns: ColumnsType<BranchOffice> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Meta ventas / mes', dataIndex: 'salesGoalByMonth', key: 'salesGoalByMonth' },
    {
      title: 'Comentarios', key: 'comment',
      render: () => (
        <Button
          shape="round"
          icon={<CommentOutlined />}
          type="primary"
          onClick={() => setOpen(true)}
        />
      ),
    }
  ], [setOpen])

  return (
    <div>
      <HeaderView
        title="Sucursales"
        path="/sucursales/registrar"
      />
      <Table
        url="branchOffice/paginatedListByUserAdmin"
        columns={columns}
        placeholderSearch="Buscar por nombre ó correo..."
        pathEdit="/sucursales/editar"
        urlDisabled="branchOffice/disable"
      />
      <Comments
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

export default Branches;