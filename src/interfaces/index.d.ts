import { TypeControl, TypeInput } from "../types";
import { FormRule } from 'antd';
import { UploadListType } from 'antd/lib/upload/interface';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CustomInput {
  typeControl: TypeControl;
  typeInput?: TypeInput;
  value?: any;
  name: string;
  md?: number;
  label?: string;
  options?: Option[];
  show?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rules?: FormRule[];
  onChange?: (value: any) => void;
  styleFI?: React.CSSProperties;
  required?: boolean;
  accept?: string;
  maxCount?: number;
  multiple?: boolean;
  loading?: boolean;
  listType?: UploadListType;
}

export interface Option {
  value: string | number;
  text: string;
}