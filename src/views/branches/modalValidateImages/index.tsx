import { FC } from 'react'
import Modal from "../../../components/modal";
import { Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  open: boolean;
  onClose: () => void;
  idBranchOffice: string;
}

const ModalValidateImages: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal 
      open={open}
      onCancel={onClose}
      okText="Guardar"
    >
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Modal>
  )
}

export default ModalValidateImages;