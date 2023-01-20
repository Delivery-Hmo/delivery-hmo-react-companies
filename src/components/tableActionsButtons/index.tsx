import { FC } from 'react'
import { Button, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dialogDelete } from '../../utils';

interface Props {
  record: any;
  onDeleted: () => void;
  fun: () => Promise<any>;
  messageError: string;
}

const TableActionsButtons: FC<Props> = ({ record, onDeleted, fun, messageError }) => {
  const navigate = useNavigate();

  const del = async () => {
    try {
      await dialogDelete(fun, messageError)
      onDeleted();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Space>
      <Tooltip title="Editar">
        <Button
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => navigate('/vendedores/editar', { state: record})}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#ec9822'}}
        />
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={del}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#d34745'}}
        />
      </Tooltip>
    </Space>
  )
}

export default TableActionsButtons