import { FC } from 'react'
import { Button, UploadFile } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  multiple?: boolean;
  value?: UploadFile<any>[] | undefined;
}

const ButtonUpload: FC<Props> = ({ multiple, value }) => {
  return (
    <Button icon={<UploadOutlined />}>
      {
        multiple || !value?.length ? "Subir foto/imagen" : "Cambiar foto/imagen"
      }
    </Button>
  )
}

export default ButtonUpload