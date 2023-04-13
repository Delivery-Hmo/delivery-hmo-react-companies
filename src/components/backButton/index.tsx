import  { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { RollbackOutlined } from "@ant-design/icons";

const BackButton: FC<ButtonProps> = ({...rest}) => {
  return (
    <Button
      shape="round"
      type="primary"
      icon={<RollbackOutlined />}
      {...rest}
    >
      Regresar
    </Button>
  )
}

export default BackButton;