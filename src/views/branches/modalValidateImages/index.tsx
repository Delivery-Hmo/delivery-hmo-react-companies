import { FC, useEffect, useState } from 'react'
import Modal from "../../../components/modal";
import { Card, UploadFile, message } from "antd";
import DynamicForm from "../../../components/dynamicForm";
import { put } from "../../../services";
import useAbortController from "../../../hooks/useAbortController";
import { BranchOffice } from "../../../interfaces/user";
import { setImagesToState } from "../../../utils/functions";
import CenterCircularProgress from "../../../components/centerCircularProgress";

interface Props {
  open: boolean;
  onClose: (success?: boolean) => void;
  branchOffice: BranchOffice;
}

const ModalValidateImages: FC<Props> = ({ open, onClose, branchOffice: branchOfficeProp }) => {
  const abortController = useAbortController();
  const [staring, setStaring] = useState(true);
  const [saving, setSaving] = useState(false);
  const [branchOffice, setBranchOffice] = useState<BranchOffice>(branchOfficeProp);
  const { id, images } = branchOffice;

  useEffect(() => {
    try {
      if (!id || !staring) return;

      const _branchOffice = setImagesToState(branchOffice);

      setBranchOffice(_branchOffice);
    } finally {
      setStaring(false);
    }
  }, [staring, branchOffice, id]);

  const onFinish = async () => {
    if (saving) return;

    if (images.length < 3) {
      message.error("Debe subir al menos 3 fotos.", 4);
      return;
    }

    setSaving(true);

    try {
      await put("branchOffice/validateImages", { images, id }, abortController.current!);
      message.success("Fotos subidas correctamente.", 4);
      onClose(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => {
        if (saving) return;

        onClose();
      }}
      okText="Guardar"
      maskClosable={false}
      okButtonProps={{
        style: {
          display: "none"
        }
      }}
      cancelButtonProps={{
        style: {
          display: "none"
        }
      }}
    >
      <h3>Sube las fotos de la cocina.</h3>
      <p>Por favor, suba tres fotos: 2 de la cocina para evaluar la higiene y 1 de la fachada de la sucursal.</p>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{ backgroundColor: "#ffd591" }}
      >
        <p style={{ paddingLeft: 15, fontWeight: "bold" }}>
          Nota: Las fotos de la sucursal seran revisadas por el equipo de Delivery HMO en un lapso de 48 hrs hábiles.
        </p>
      </Card>
      <br />
      {
        staring
          ? <CenterCircularProgress height="25vh" />
          : <DynamicForm
            inputs={[
              {
                name: 'images',
                typeControl: "file",
                onChange: (files: UploadFile<any>[]) => setBranchOffice(b => ({ ...b, images: files })),
                value: branchOffice.images,
                accept: "image/png, image/jpeg",
                maxCount: 3,
                listType: "picture"
              }
            ]}
            onFinish={onFinish}
            loading={saving}
          />
      }

    </Modal>
  )
}

export default ModalValidateImages;