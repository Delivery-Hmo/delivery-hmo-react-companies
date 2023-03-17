import { FC } from 'react';
import { Form, Input } from 'antd';

interface Props {
  onSearch: ((value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => void) | undefined;
  placeholder?: string;
}

const { Search } = Input;

const SearchTable: FC<Props> = ({ onSearch, placeholder }) => {
  return (
    <Form layout='vertical'>
      <Form.Item
        name='search'
        style={{ marginBottom: '5px' }}
      >
        <Search
          enterButton
          onSearch={onSearch}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchTable