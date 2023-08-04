import { FC, useMemo } from 'react'
import { Button, UploadFile } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  value: UploadFile<any>[];
  multiple?: boolean;
  maxCount: number;
  disabled: boolean;
}

const ButtonUpload: FC<Props> = ({ value, multiple, maxCount, disabled }) => {
  const textButton = useMemo(() => {
    if (multiple) {
      return "Subir foto/imagen";
    }

    return value?.length && maxCount === 1 ? "Cambiar foto/imagen" : "Subir foto/imagen";
  }, [multiple, maxCount, value]);

  return (
    <Button disabled={disabled} icon={<UploadOutlined />} children={textButton} />
  )
}

export default ButtonUpload;