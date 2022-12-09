import { default as CheckboxAnt } from "antd/lib/checkbox/Checkbox";

interface ValueOptionsCheckbox {

}

export interface PropsInput<T extends ValueOptionsCheckbox> {
  value: T;
  onChange: (value: T) => void;
}

const Checkbox = () => {
  return (
    <CheckboxAnt onChange={(e) => {}} />
  )
}

export default Checkbox;