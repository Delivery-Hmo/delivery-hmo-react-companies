import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker, FormRule, Upload, Button, UploadFile } from 'antd';
import { rulePhoneInput, ruleMaxLength, ruleEmail } from '../../constants';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  id?: string;
  inputs: CustomInput[];
}

const DynamicContentForm: FC<Props> = ({ inputs: inputsProp }) => {
  const [inputs, setInputs] = useState<CustomInput[]>(inputsProp);

  useEffect(() => {
    const _inputs = inputsProp.map(input => {
      const { rules, typeControl, typeInput, required, value } = input;
      const _rules = [...rules || [] as FormRule[]];

      if (["input", "textarea"].includes(typeControl) && (value || "" as string).length > 300) {
        _rules.push(ruleMaxLength);
      }

      if (typeControl === "phone" && required && (value as number).toString().length !== 10) {
        _rules.push(rulePhoneInput);
      }

      if (typeInput === "email") {
        _rules.push(ruleEmail);
      }

      return { ...input, rules: _rules };
    });

    setInputs(_inputs);
  }, [inputsProp]);

  const controls: Record<string, (input: CustomInput) => ReactNode> = useMemo(() => ({
    input: ({ value, onChange, typeInput }: CustomInput) => <Input
      type={typeInput || 'text'}
      value={value}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }

        return typeInput === "number" && ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
      }}
      onChange={e => onChange(e.target.value)}
      onWheel={e => e.preventDefault()}
      onKeyUp={e => e.preventDefault()}
      autoComplete="new-password"
    />,
    phone: ({ value, onChange }: CustomInput) => <Input
      type="number"
      value={value}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }

        return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
      }}
      onChange={e => onChange(e.target.value)}
      onWheel={e => e.preventDefault()}
    />,
    select: ({ value, onChange, options }: CustomInput) => <Select value={value} onChange={onChange}>
      {options?.map((option: Option) => <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>)}
    </Select>,
    textarea: ({ value, onChange }: CustomInput) => <Input.TextArea value={value} onChange={e => onChange(e.target.value)} />,
    checkbox: ({ value, onChange }: CustomInput) => <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />,
    date: ({ value, onChange }: CustomInput) => <DatePicker style={{ width: '100%' }} value={value} onChange={onChange} />,
    timeRangePicker: ({ value, onChange }) => <TimePicker.RangePicker value={value} onChange={onChange} />,
    file: ({ value, onChange, accept, maxCount, multiple }: CustomInput) => {
      const _value = value as UploadFile<any>[] | undefined;

      return <Upload
        fileList={_value}
        onChange={e => onChange(e.fileList)}
        accept={accept}
        listType="picture-card"
        maxCount={maxCount}
        multiple={multiple}
      >
        <Button
          icon={<UploadOutlined />}
        >
          {
            multiple || !_value?.length ? "Subir foto/imagen" : "Cambiar foto/imagen"
          }
        </Button>
      </Upload>
    }
  }), [])

  return (
    <Row gutter={10}>
      {
        inputs.map((input) => {
          const { label, name, md, rules, typeControl, styleFI, show = true } = input;

          return (
            <Col xs={24} md={md} key={name}>
              {
                show && <Form.Item
                  label={label}
                  name={name}
                  rules={rules}
                  style={styleFI}
                >
                  {controls[typeControl](input)}
                </Form.Item>
              }
            </Col>
          )
        })
      }
    </Row>
  )
}

export default DynamicContentForm;