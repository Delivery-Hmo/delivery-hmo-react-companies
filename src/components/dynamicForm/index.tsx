import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker, FormRule, Upload, UploadFile, message } from 'antd';
import { rulePhoneInput, ruleMaxLength, ruleEmail } from '../../constants';
import { FormInstance, FormLayout } from "antd/es/form/Form";
import { UploadChangeParam, UploadProps } from "antd/es/upload";
import SaveButton from "../saveButton";
import ButtonUpload from "./buttonUpload";
import Crop from "./crop";
import { onPreviewImage, validFiles } from "../../utils/functions";
import { FirebaseError } from "firebase/app";

interface Props {
  form?: FormInstance<any>;
  inputs: CustomInput[];
  layout?: FormLayout;
  onFinish: (values: any) => Promise<void>;
  loading: boolean;
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
  textSubmit?: string;
  styleSubmit?: React.CSSProperties;
}

const DynamicForm: FC<Props> = ({ inputs: inputsProp, layout, form, onFinish, loading, justify, textSubmit, styleSubmit }) => {
  const [inputs, setInputs] = useState<CustomInput[]>(inputsProp);

  useEffect(() => {
    const _inputs = inputsProp.map(input => {
      const { rules, typeControl, typeInput, required, value } = input;
      const _rules = [...rules || [] as FormRule[]];

      if (["input", "textarea"].includes(typeControl) && (value || "" as string).length > 300) {
        _rules.push(ruleMaxLength);
      }

      if (typeControl === "phone" && required && (value as number)?.toString().length !== 10) {
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
      onChange={e => onChange && onChange(e.target.value)}
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
      onChange={e => onChange && onChange(e.target.value)}
      onWheel={e => e.preventDefault()}
    />,
    select: ({ value, onChange, options }: CustomInput) => <Select value={value} onChange={onChange}>
      {options?.map((option: Option) => <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>)}
    </Select>,
    textarea: ({ value, onChange }: CustomInput) => <Input.TextArea value={value} onChange={e => onChange && onChange(e.target.value)} />,
    checkbox: ({ value, onChange }: CustomInput) => <Checkbox checked={value} onChange={e => onChange && onChange(e.target.checked)} />,
    date: ({ value, onChange }: CustomInput) => <DatePicker style={{ width: '100%' }} value={value} onChange={onChange} />,
    timeRangePicker: ({ value, onChange }) => <TimePicker.RangePicker value={value} onChange={onChange} />,
    file: ({ value, onChange, accept, maxCount, multiple, listType }: CustomInput) => {
      const _value = value as UploadFile<any>[];
      const count = _value?.length || 0;

      maxCount = maxCount || 1;

      const disabled = count >= maxCount;
      const propsUpload: UploadProps = {
        fileList: _value,
        accept,
        multiple: multiple && !accept?.includes("image"),
        onPreview: onPreviewImage,
        listType: listType || "picture-card",
        onChange: ({ fileList, file }: UploadChangeParam<UploadFile<any>>) => {
          const isValid = validFiles(fileList.filter(f => f.originFileObj).map(f => f.originFileObj!), accept!, true);

          if (!isValid) {
            onChange && onChange([]);
            return;
          }

          onChange && onChange(multiple ? fileList : [file]);
        },
        customRequest: ({ onSuccess }) => {
          setTimeout(() => {
            onSuccess!("ok");
          }, 0);
        },
        children: <ButtonUpload value={_value} multiple={multiple} maxCount={maxCount} disabled={Boolean(multiple) && disabled} />
      };

      return accept?.includes("image")
        ? <Crop beforeCrop={(_, fileList) => validFiles(fileList, accept)}>
          <Upload {...propsUpload} />
        </Crop>
        : <Upload {...propsUpload} />;
    }
  }), []);

  return (
    <Form
      form={form}
      layout={layout}
      onFinish={async (values) => {
        try {
          await onFinish(values);
        } catch (error) {
          console.log(error);

          if (error instanceof FirebaseError) {
            let messageError = error.message;

            switch (error.code) {
              case "auth/email-already-in-use":
                messageError = "Otra empresa ya está utilizando el correo proporcionado."
                break
              case "auth/invalid-email":
                messageError = "El correo electrónico no es válido."
                break
            }

            message.error(messageError, 4);
            return;
          }

          if (error instanceof Error) {
            message.error(error.message, 4);
            return;
          }

          if (typeof error === "string") {
            message.error(error as string, 4);
            return;
          }

          message.error("Ocurrio un error!", 4);
        }
      }}
    >
      <Row gutter={10} justify={justify}>
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
      <SaveButton
        htmlType='submit'
        loading={loading}
        style={styleSubmit}
      >
        {textSubmit || "Guardar"}
      </SaveButton>
    </Form>
  )
}

export default DynamicForm;