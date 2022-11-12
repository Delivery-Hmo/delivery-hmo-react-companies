import  { FC } from 'react';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";

const RegisterButton: FC<ButtonProps> = ({...rest}) => {
  return (
    <ButtonAnt
      shape="round"
      icon={<PlusCircleOutlined />}
      type="primary"
      {...rest}
    />
  )
}

export default RegisterButton;