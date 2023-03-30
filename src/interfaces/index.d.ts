import { TypeControl, TypeInput } from "../types";
import { FormRule } from 'antd';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CustomInput {
  typeControl: TypeControl;
  typeInput?: TypeInput;
  value: any;
  name: string;
  md?: number;
  label?: string;
  options?: Option[];
  required?: boolean;
  show?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rules?: FormRule[];
  onChange: (value: any) => void;
  styleFI?: React.CSSProperties;
  show?: boolean;
  required?: boolean;
  loading?: boolean;
}

export interface Option {
  value: string | number;
  text: string;
}
