import { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { RollbackOutlined } from "@ant-design/icons";

const BackButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      shape="round"
      type="primary"
      icon={<RollbackOutlined />}
      {...props}
    >
      Regresar
    </Button>
  )
}

export default BackButton;