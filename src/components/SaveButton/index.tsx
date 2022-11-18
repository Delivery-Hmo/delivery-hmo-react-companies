import  { FC } from 'react';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import { SaveOutlined } from "@ant-design/icons";

const SaveButton: FC<ButtonProps> = ({...rest}) => {
  return (
    <ButtonAnt
      shape="round"
      icon={<SaveOutlined />}
      type="primary"
      {...rest}
    />
  )
}

export default SaveButton;