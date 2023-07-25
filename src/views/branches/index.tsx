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
  const [branchOffice, setBranchOffice] = useState<BranchOffice>();

  const onChangeShowInApp = useCallback(async (_branchOffice: BranchOffice) => {
    const { validatingImages, validatedImages, products } = _branchOffice;

    if (validatingImages) {
      await confirmDialog("En proceso de validación de fotos, ¿desea cambiar las fotos?", async () => {
        setBranchOffice(_branchOffice);
        setOpenValidateImages(true);
      });

      return;
    }

    if (!validatedImages) {
      await confirmDialog("Sucursal sin fotos validadas, ¿desea validar las fotos?", async () => {
        setBranchOffice(_branchOffice);
        setOpenValidateImages(true);
      });

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
      title: 'Comentarios',
      key: 'comment',
      render: (_, _branchOffice) => (
        <Button
          shape="circle"
          icon={<CommentOutlined />}
          type="primary"
          onClick={() => {
            setBranchOffice(_branchOffice);
            setOpenComments(true);
          }}
        />
      )
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
        onClose={() => {
          setBranchOffice(undefined);
          setOpenComments(false);
        }}
        idBranchOffice={branchOffice?.id!}
      />
      {
        branchOffice && <ModalValidateImages
          open={openValidateImages}
          onClose={(success) => {
            setBranchOffice(undefined);
            setOpenValidateImages(false);

            if (success) {
              setUrlTable("");
              setTimeout(() => {
                setUrlTable("branchOffice/paginatedListByUserAdmin");
              }, 500);
            }
          }}
          branchOffice={branchOffice}
        />
      }

    </div>
  )
}

export default Branches;