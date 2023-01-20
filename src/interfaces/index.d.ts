import { OptionsValue, TypesInputs } from "../types"
import { FormRule } from 'antd';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CustomInput {
  type: TypesInputs;
  typeInput?: 'text' | 'number' | 'password' | 'email';
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
}

export interface Option {
  value: string | number;
  text: string;
}
