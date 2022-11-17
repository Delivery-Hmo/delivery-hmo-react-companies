import { default as InputAnt } from "antd/lib/input/Input";

export type ValueOptionsInput = string | number | readonly string[] | undefined;

export interface PropsInput<T extends ValueOptionsInput> {
  value: T;
  onChange: (value: T) => void;
}

const Input = <T extends ValueOptionsInput> ({value, onChange}: PropsInput<T>) => {
  return (
    <InputAnt
      value={value} 
      onChange={(e) => {
        const { value: newValue } = e.target;
        onChange((typeof value === "string" ? newValue : +newValue) as T)
      }} 
    />
  )
}

export default Input;