import  { FC } from 'react';
import { Button as ButtonAnt, ButtonProps, Form } from 'antd';
import { SaveOutlined } from "@ant-design/icons";

const SaveButton: FC<ButtonProps> = ({...rest}) => {
  return (
    <Form.Item>
      <ButtonAnt
        shape="round"
        icon={<SaveOutlined />}
        type="primary"
        {...rest}
      />
    </Form.Item>
  )
}

export default SaveButton;