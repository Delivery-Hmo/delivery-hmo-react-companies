import { useMemo, useState } from 'react';
import { Button, Switch, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from "@ant-design/icons";
import HeaderView from '../../components/headerView';
import Table from '../../components/table';
import { BranchOffice } from "../../interfaces/user";
import Comments from './comments';

const Branches = () => {
  const [urlTable, setUrlTable] = useState("branchOffice/paginatedListByUserAdmin");
  const [openComments, setOpenComments] = useState(false);
  const [idBranchOffice, setIdBranchOffice] = useState("");

  const columns: ColumnsType<BranchOffice> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Meta ventas / mes', dataIndex: 'salesGoalByMonth', key: 'salesGoalByMonth' },
    {
      title: 'Ver en app móvil',
      key: 'showingInApp',
      render: (_, { id, showInApp, validatingImages, validatedImages }) => (
        <Switch
          checked={showInApp}
          style={{ backgroundColor: showInApp ? "#304878" : undefined }}
          onChange={() => {
            if(validatingImages) {
              message.warning("Sucursal en proceso de validación de fotos.");
              return;
            }

            if(!validatedImages) {
              //aqui nos quedamos.
            }

            //esto se hara si se activa o inactiva.
            setUrlTable("");
            setTimeout(() => {
              setUrlTable("branchOffice/paginatedListByUserAdmin");
            }, 500); 
          }}
        />
      )
    },
    {
      title: 'Estatus',
      key: 'status',
      render: (_, { validatingImages, showInApp }) => (
        <Tag
          color={validatingImages ? "red" : showInApp ? "green" : "orange"}
          children={validatingImages ? "Validando fotos" : showInApp ? "Mostrando en app" : "Ocupalta en app"}
          title={validatingImages ? "Validando fotos" : showInApp ? "Mostrando en app" : "Ocupalta en app"}
        />
      )
    },
    {
      title: 'Comentarios', key: 'comment',
      render: (_, { id }) => (
        <Button
          shape="round"
          icon={<CommentOutlined />}
          type="primary"
          onClick={() => {
            setIdBranchOffice(id!)
            setOpenComments(true)
          }}
        />
      ),
    },
  ], [setOpenComments]);

  console.log(urlTable)

  return (
    <div>
      <HeaderView
        title="Sucursales"
        path="/sucursales/registrar"
      />
      <Table
        url={urlTable}
        columns={columns}
        placeholderSearch="Buscar por nombre ó correo..."
        pathEdit="/sucursales/editar"
        urlDisabled="branchOffice/disable"
      />
      <Comments
        open={openComments}
        onClose={() => setOpenComments(false)}
        idBranchOffice={idBranchOffice}
      />
    </div>
  )
}

export default Branches;