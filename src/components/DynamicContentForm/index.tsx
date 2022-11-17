import { FC, ReactNode } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Row, Col, Select, Form, Checkbox, DatePicker, Button, Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Input, { ValueOptionsInput } from "../Generics/Input";

interface Props<T extends ValueOptionsInput> {
  inputs: Array<CustomInput<T>>;
}

const controls: Record<string, <T extends ValueOptionsInput>(value: T, onChange: (value: T) => void) => JSX.Element> = {
  input: <T extends ValueOptionsInput>(value: T, onChange: (value: T) => void) => <Input value={value} onChange={onChange} />,
}

const DynamicContentForm = <T extends ValueOptionsInput>({ inputs } : Props<T> ) => {
  return (
    <Row gutter={10}>
    {
      inputs.map(({label, name, rules, type, value, onChange, styleFI}) =>
        <Col xs={24} sm={24}>
          <Form.Item
            label={label}
            name={name}
            rules={rules}
            style={styleFI}
          >
            { controls[type](value, onChange) }
          </Form.Item>
        </Col>
      )
    }
    </Row>
  )
}

export default DynamicContentForm;



