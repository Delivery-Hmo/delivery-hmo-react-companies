import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker, FormRule, Upload, UploadFile, message } from 'antd';
import { rulePhoneInput, ruleMaxLength, ruleEmail, urlImageDefaultProfile } from '../../constants';
import { FormInstance, FormLayout } from "antd/es/form/Form";
import SaveButton from "../saveButton";
import { deleteFile } from "../../services/firebaseStorage";
import { UploadChangeParam, UploadProps } from "antd/es/upload";
import ButtonUpload from "./buttonUpload";
import Crop from "./crop";
import { onPreviewImage, validFiles } from "../../utils/functions";

interface Props {
  form?: FormInstance<any>;
  inputs: CustomInput[];
  layout?: FormLayout;
  onFinish: (values: any) => Promise<void>;
  loading: boolean;
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
}

const DynamicForm: FC<Props> = ({ inputs: inputsProp, layout, form, onFinish, loading, justify }) => {
  const [inputs, setInputs] = useState<CustomInput[]>(inputsProp);
  const [urlsToDelete, setUrlsToDelete] = useState<string[]>([]);

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

      const propsUpload: UploadProps = {
        fileList: _value,
        accept,
        maxCount,
        multiple,
        onPreview: onPreviewImage,
        listType: "picture-card",
        onRemove: (file: UploadFile) => {
          if (file.url?.includes("https://firebasestorage.googleapis.com/") && file.url !== urlImageDefaultProfile) {
            setUrlsToDelete(u => [...u, file.url!]);
          }
        },
        onChange: ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
          const isValid = validFiles(fileList.map(f => f.originFileObj!), accept!, true);

          if(!isValid) {
            onChange([]);
            return;
          }

          setUrlsToDelete(u => [
            ...u, 
            ...fileList.map(f => f.url!).filter(url => url?.includes("https://firebasestorage.googleapis.com/") && url !== urlImageDefaultProfile) 
          ]);
          onChange(fileList);
        },
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
      };

      return accept?.includes("image")
        ? <Crop beforeCrop={(_, fileList) => validFiles(fileList, accept)}>
          <Upload {...propsUpload}>
            <ButtonUpload multiple={multiple} value={_value} />
          </Upload>
        </Crop>
        : <Upload {...propsUpload}>
          <ButtonUpload multiple={multiple} value={_value} />
        </Upload>
    }
  }), []);

  const deleteFilesStorage = async () => {
    const promisesDelete = urlsToDelete.map(url => deleteFile(url));

    await Promise.all(promisesDelete);
  }

  return (
    <Form
      form={form}
      layout={layout}
      onFinish={async (values) => {
        try {
          await onFinish(values);
          await deleteFilesStorage();
        } catch (error) {
          if (error instanceof Error) {
            message.error(error.message, 4);
            return;
          }

          message.error(error as string, 4);
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
      >
        Guardar
      </SaveButton>
    </Form>
  )
}

export default DynamicForm;