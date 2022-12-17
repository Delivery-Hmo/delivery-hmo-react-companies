import { FC } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker } from 'antd';

interface Props {
  inputs: CustomInput[];
}

const typeInputs: Record<string, (input: CustomInput) => JSX.Element> = {
  input: ({ value, onChange, typeInput }: CustomInput) =>
    <Input
      type={typeInput || 'text'}
      value={value}
      onKeyDown={(e) => typeInput === "number" && ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
      onChange={(e) => onChange(e.target.value)}
    />,
  select: ({ value, onChange, options }: CustomInput) => <Select value={value} onChange={onChange}>,
    {options?.map((option: Option) => <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>)}
  </Select>,
  textarea: ({ value, onChange }: CustomInput) => <Input.TextArea value={value} onChange={(e) => onChange(e.target.value)} />,
  checkbox: ({ value, onChange }: CustomInput) => <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />,
  date: ({ value, onChange }: CustomInput) => <DatePicker style={{ width: '100%' }} value={value} onChange={onChange} />,
  timeRangePicker: ({ value, onChange }) => <TimePicker.RangePicker value={value} onChange={onChange} />
  //file: ({value, onChange}: CustomInput) => <Upload> <Button icon={<UploadOutlined />}>Upload</Button> </Upload>
}

const DynamicContentForm: FC<Props> = ({ inputs }) => {
  return (
    <Row gutter={10}>
      {
        inputs.map((input) => {
          const { label, name, md, rules, type, styleFI, hidden = true } = input;

          return (
            <Col xs={24} md={md} key={name}>
              {hidden && (<Form.Item
                label={label}
                name={name}
                rules={rules}
                style={styleFI}
              >
                {typeInputs[type](input)}
              </Form.Item>)
              }
            </Col>
          )
        })
      }
    </Row>
  )
}

export default DynamicContentForm;