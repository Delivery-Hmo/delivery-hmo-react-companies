import { FC, useState } from 'react'
import Modal from "../../../components/modal";
import { Card, UploadFile, message } from "antd";
import DynamicForm from "../../../components/dynamicForm";
import { put } from "../../../services";
import useAbortController from "../../../hooks/useAbortController";

interface Props {
  open: boolean;
  onClose: (success?: boolean) => void;
  idBranchOffice: string;
}

const ModalValidateImages: FC<Props> = ({ open, onClose, idBranchOffice }) => {
  const abortController = useAbortController();
  const [images, setImages] = useState<UploadFile<any>[]>([]);
  const [saving, setSaving] = useState(false);

  const onFinish = async () => {
    if (saving) return;

    if (images.length < 3) {
      message.error("Debe subir al menos 3 fotos.", 4);
      return;
    }

    setSaving(true);

    try {
      await put("branchOffice/update", { images, id: idBranchOffice }, abortController);
      onClose(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      afterClose={() => setImages([])}
      open={open}
      onCancel={() => {
        if(saving) return;

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
      <h3>Subir fotos cocina sucursal</h3>
      <p>Por favor, suba tres fotos: 2 de la cocina para evaluar higiene y 1 de la fachada de la sucursal.</p>
      <Card 
        bodyStyle={{ padding: 0 }} 
        style={{ backgroundColor: "#ffd591" }}
      >
        <p style={{ paddingLeft: 15, fontWeight: "bold" }}>
          Nota: Las fotos de la sucursal seran revisadas por el equipo de Delivery HMO en un lapso de 24 hrs.
        </p>
      </Card>
      <br />
      <DynamicForm
        inputs={[
          {
            name: 'images',
            typeControl: "file",
            onChange: (file: UploadFile<any>[]) => setImages(file),
            value: images,
            accept: "image/png, image/jpeg",
            maxCount: 3,
            listType: "picture"
          }
        ]}
        onFinish={onFinish}
        loading={saving}
      />
    </Modal>
  )
}

export default ModalValidateImages;