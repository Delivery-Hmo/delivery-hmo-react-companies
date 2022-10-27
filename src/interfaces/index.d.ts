export interface CustomInput {
  type: 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file';
  typeInput?: 'text' | 'number' | 'password' | 'email';
  value: any;
  name: string;
  md: number;
  label?: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rules?: Rule[];
  onChange: (value: any) => void;
}

export interface Option {
  value: string | number;
  text: string;
}
