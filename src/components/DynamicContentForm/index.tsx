import { FC, ReactNode } from "react";
import { CustomInput, Option } from "../../interfaces";
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  inputs: CustomInput[];
}

const DynamicContentForm: FC<Props> = ({inputs}) => {
  const getInpunt = (input: CustomInput): ReactNode | null => {
    let { type, typeInput, value, label, name, rules, options, onChange } = input;

    switch (type) {
      case "input":
        return <Form.Item
          label={label}
          name={name}
          rules={rules}
        >
          <Input type={typeInput || "text"} value={value} onChange={(e) => onChange(e.target.value)}/>
        </Form.Item>
      case "select":
        return <Form.Item
          label={label}
          name={name}
          rules={rules}
        >
          <Select value={value} onChange={onChange}>
            {options?.map((option: Option) => <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>)}
          </Select>
        </Form.Item>
      case "textarea": 
        return <Form.Item
          label={label}
          name={name}
          rules={rules}
        >
          <Input.TextArea value={value} onChange={(e) => onChange(e.target.value)} />
        </Form.Item>
      case "checkbox":
        return <Form.Item
          label={label}
          name={name}
        >
          <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
        </Form.Item>
      case "date":
        return <Form.Item
          label={label}
          name={name}
          rules={rules}
        >
          <DatePicker style={{width: "100%"}} value={value} onChange={(date) => onChange(date)} />
        </Form.Item>
      case "file":
        return <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      default:
        return null;
    }
  }

  return (
    <Row gutter={10}>
    {
      inputs.map(input => 
        <Col xs={24} sm={24} md={input.md} key={input.name}>
          { getInpunt(input) }
        </Col>
      )
    }
    </Row>  
  )
}

export default DynamicContentForm;