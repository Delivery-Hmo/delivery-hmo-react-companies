import { OptionsValue } from "../types"

export interface CustomInput<T extends ValueOptions> {
  type: 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file';
  typeInput?: 'text' | 'number' | 'password' | 'email';
  value: T;
  name: string;
  md: number;
  label?: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rules?: Rule[];
  onChange: (value: T) => void;
  styleFI?: React.CSSProperties;
}

export interface Option {
  value: string | number;
  text: string;
}
