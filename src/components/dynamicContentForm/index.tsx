import { FC, useEffect, useMemo, useState } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker, FormRule } from 'antd';
import { rulePhoneInput, ruleMaxLength, ruleEmail } from '../../constants';

interface Props {
  id?: string;
  inputs: CustomInput[];
}

const DynamicContentForm: FC<Props> = ({ inputs: inputsProp, id }) => {
  const [inputs, setInputs] = useState<CustomInput[]>(inputsProp);

  useEffect(() => {
    const _inputs = inputsProp.map(input => {
      const { rules, typeControl, typeInput, required } = input;
      const _rules = [...rules || [] as FormRule[]];

      if(["text", "password", "email"].includes(typeInput || "" as string)) {
        _rules.push(ruleMaxLength);
      }

      if(!id && typeControl === "phone" && required) {
        _rules.push(rulePhoneInput);
      }

      if(typeInput === "email") {
        _rules.push(ruleEmail);
      }

      return { ...input, rules: _rules };
    });

    setInputs(_inputs);
  }, [inputsProp, id]);

  const controls: Record<string, (input: CustomInput) => JSX.Element> = useMemo(() => ({
    input: ({ value, onChange, typeInput }: CustomInput) => <Input
      type={typeInput || 'text'}
      value={value}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }

        return typeInput === "number" && ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
      }}
      onChange={e => onChange(e.target.value)}
      onWheel={e => e.preventDefault()}
      onKeyUp={e => e.preventDefault()}
      autoComplete="new-password"
    />,
    phone: ({ name, value, onChange, rules }: CustomInput) => <Input
      type="number"
      value={value}
      onKeyDown={e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
        }

        return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
      }}
      onChange={e => {
        if(!rules?.length) {
          setInputs(i => i.map(input => {
            if(input.name === name && input.typeControl === "phone") {
              return { ...input, rules: [rulePhoneInput] };
            }

            return input;
          }));
        }

        onChange(e.target.value)
      }}
      onWheel={e => e.preventDefault()}
    />,
    select: ({ value, onChange, options }: CustomInput) => <Select value={value} onChange={onChange}>
      {options?.map((option: Option) => <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>)}
    </Select>,
    textarea: ({ value, onChange }: CustomInput) => <Input.TextArea value={value} onChange={(e) => onChange(e.target.value)} />,
    checkbox: ({ value, onChange }: CustomInput) => <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />,
    date: ({ value, onChange }: CustomInput) => <DatePicker style={{ width: '100%' }} value={value} onChange={onChange} />,
    timeRangePicker: ({ value, onChange }) => <TimePicker.RangePicker value={value} onChange={onChange} />
    //file: ({value, onChange}: CustomInput) => <Upload> <Button icon={<UploadOutlined />}>Upload</Button> </Upload>
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