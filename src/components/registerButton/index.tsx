import  { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";

const CreateButton: FC<ButtonProps> = ({...rest}) => {
  return (
    <Button
      shape="round"
      icon={<PlusCircleOutlined />}
      type="primary"
      {...rest}
    />
  )
}

export default CreateButton;