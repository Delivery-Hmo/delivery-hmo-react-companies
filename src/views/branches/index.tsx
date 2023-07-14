import { useCallback, useMemo, useState } from 'react';
import { Button, Switch, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from "@ant-design/icons";
import HeaderView from '../../components/headerView';
import Table from '../../components/table';
import { BranchOffice } from "../../interfaces/user";
import { confirmDialog } from "../../utils/functions";
import ModalValidateImages from "./modalValidateImages";
import Comments from './comments';

const Branches = () => {
  const [urlTable, setUrlTable] = useState("branchOffice/paginatedListByUserAdmin");
  const [openComments, setOpenComments] = useState(false);
  const [openValidateImages, setOpenValidateImages] = useState(false);
  const [idBranchOffice, setIdBranchOffice] = useState("");

  const onChangeShowInApp = useCallback(async ({ id, showInApp, validatingImages, validatedImages, products }: BranchOffice) => {
    if (validatingImages) {
      //hay que hacer un modal como el de abajo para que se peudan editar las imagenes si queire el usaurio antes que se las confirmen o denieguen
      message.warning("No se puede activar, en proceso de validación de fotos.", 4);
      return;
    }

    if (!validatedImages) {
      const resultConfirm = await confirmDialog("Sucursal sin fotos validadas, desea validar las fotos?", async () => {
        setOpenValidateImages(true)

        return true;
      });

      if(resultConfirm) {
        setIdBranchOffice(id!);
        setOpenValidateImages(true);
      }

      return;
    }


    if (!products.length) {
      message.warning("No se puede activar, sucursal sin productos para vender.", 4);
      return;
    }

    //esto se hara si se activa o inactiva para refrescar la lista.
    setUrlTable("");
    setTimeout(() => {
      setUrlTable("branchOffice/paginatedListByUserAdmin");
    }, 500);
  }, []);

  const columns: ColumnsType<BranchOffice> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Meta ventas / mes', dataIndex: 'salesGoalByMonth', key: 'salesGoalByMonth' },
    {
      title: 'Ver en app móvil',
      key: 'showingInApp',
      render: (_, branchOffice) => (
        <Switch
          checked={branchOffice.showInApp}
          style={{ backgroundColor: branchOffice.showInApp ? "#304878" : undefined }}
          onChange={async () => await onChangeShowInApp(branchOffice)}
        />
      )
    },
    {
      title: 'Estatus',
      key: 'status',
      render: (_, { validatingImages, showInApp }) => (
        <Tag
          color={validatingImages ? "red" : showInApp ? "green" : "orange"}
          children={validatingImages ? "Validando fotos" : showInApp ? "Mostrando en app" : "Oculta en app"}
          title={validatingImages ? "Validando fotos" : showInApp ? "Mostrando en app" : "Oculta en app"}
        />
      )
    },
    {
      title: 'Comentarios', key: 'comment',
      render: (_, { id }) => (
        <Button
          shape="circle"
          icon={<CommentOutlined />}
          type="primary"
          onClick={() => {
            setIdBranchOffice(id!);
            setOpenComments(true);
          }}
        />
      ),
    },
  ], [setOpenComments, onChangeShowInApp]);

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
      <ModalValidateImages 
        open={openValidateImages}
        onClose={() => setOpenValidateImages(false)}
        idBranchOffice={idBranchOffice}
      />
    </div>
  )
}

export default Branches;