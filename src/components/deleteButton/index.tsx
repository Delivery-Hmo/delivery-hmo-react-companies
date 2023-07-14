import { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

const DeleteButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      shape="circle"
      icon={<DeleteOutlined />}
      type="ghost"
      style={{ color: '#fff', backgroundColor: '#d34745' }}
      size="middle"
      {...props}
    />
  )
}

export default DeleteButton;