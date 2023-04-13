import { FC } from 'react';
import { Button, message, Space, Tooltip, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  record: any;
  onDeleted: () => void;
  fun: () => Promise<any>;
  messageError: string;
  pathEdit: string;
}

const dialogDelete = (fun: () => Promise<any>, messageError: string): Promise<boolean> =>
  new Promise((resolve, reject) => Modal.confirm({
    title: 'Eliminar',
    icon: <ExclamationCircleOutlined />,
    content: '¿Seguro que deseas eliminar este registro?',
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    onOk: async () => {
      try {
        await fun();
        message.success(messageError);
        resolve(true);
      } catch (error) {
        console.log(error);
        message.error("Error al eliminar el registro.", 4)
        reject(false)
      }
    },
  }));


const TableActionsButtons: FC<Props> = ({ record, onDeleted, fun, messageError, pathEdit }) => {
  const navigate = useNavigate();

  const del = async () => {
    try {
      await dialogDelete(fun, messageError);
      onDeleted();
    } catch (error) {
      console.error(error);
      message.error("Error al eliminar el registro.");
    }
  }

  return (
    <Space>
      <Tooltip title="Editar">
        <Button
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => navigate(pathEdit, { state: record })}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#ec9822' }}
        />
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={del}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#d34745' }}
        />
      </Tooltip>
    </Space>
  )
}

export default TableActionsButtons;