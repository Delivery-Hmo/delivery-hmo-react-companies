import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CustomInput, Option } from '../../interfaces';
import { Input, Row, Col, Select, Form, Checkbox, DatePicker, TimePicker, FormRule, Upload, Button, UploadFile, message } from 'antd';
import { rulePhoneInput, ruleMaxLength, ruleEmail } from '../../constants';
import { FormInstance, FormLayout } from "antd/es/form/Form";
import SaveButton from "../saveButton";
import { deleteFile } from "../../services/firebaseStorage";
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadProps } from "antd/es/upload";
import ButtonUpload from "./ButtonUpload";

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

  const onPreview = useCallback(async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }, []);

  //falta testear esta funcion con otros tipos de archivos
  const validateFiles = useCallback((fileList: UploadFile<any>[], accept: string) => {
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const types = accept?.split(",").map(type => type.trim()) || [];
    
      if (!types.includes(file.type!)) {
        message.error(`Formato incorrecto.`, 4);
        return false;
      }
    }
    
    return true;
  }, []);

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
        onPreview,
        listType: "picture-card",
        onRemove: (file: UploadFile) => {
          if (file.url?.includes("https://firebasestorage.googleapis.com/")) {
            setUrlsToDelete(u => [...u, file.url!]);
          }
        },
        onChange: ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
          const filesValidated = validateFiles(fileList, accept!);

          if(!filesValidated) {
            return;
          }

          onChange(fileList)
        },  
      };

      return accept?.includes("image")
        ? <ImgCrop
          quality={0.5}
          rotationSlider
          aspectSlider
          showGrid
          showReset
          modalTitle="Editar"
          modalCancel="Cancelar"
          modalOk="Aceptar"
          resetText="Reiniciar"
        >
          <Upload {...propsUpload}>
            <ButtonUpload />
          </Upload>
        </ImgCrop>
        : <Upload {...propsUpload}>
          <ButtonUpload />
        </Upload>
    }
  }), [onPreview, validateFiles]);

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