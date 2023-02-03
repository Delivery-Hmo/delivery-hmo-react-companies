import { useState, useEffect } from 'react'
import { Button, Col, Empty, Form, Input, message, Row, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';
import { useAuth } from '../../context/authContext';
import { get, patch } from '../../services';
import { dialogDelete } from '../../utils';
import { UserBranchOfficeDeliveryMan } from '../../interfaces/user';

interface Get {
  list: UserBranchOfficeDeliveryMan[];
  total: number;
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const { Search } = Input
const headerStyle = {
  fontWeight: 'bold',
};

const UserBranchOfficeDeliveryManView = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deliveryMan, setDeliveryMan] = useState<UserBranchOfficeDeliveryMan[]>([])
  const [staring, setStaring] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!userAdmin || !staring) return;

    const controller = new AbortController();
    const init = async () => {
      try {
        const { list, total } = await get<Get>(`userBranchOfficeDeliveryMan/listByUserAdmin?page=${page}&limit=${limit}&search=${search}`, controller);

        setDeliveryMan(list);
        setTotal(total);
      } catch (error) {
        console.log(error);
        message.error("Error al obtener los repartidores");
      } finally {
        setStaring(false);
      }
    }

    init();

    return () => {
      controller.abort();
    }
  }, [limit, page, search, staring, userAdmin])

  const deleteDeliveryMan = async (record: UserBranchOfficeDeliveryMan) => {
    try {
      const { id } = record
      const fun = () => patch(`userBranchOfficeDeliveryMan/disable`, { id, active: false });

      await dialogDelete(fun, "Vendedor eliminado con éxito.")

      setStaring(true);
    } catch (error) {
      console.error(error)
    }
  }



  const ActionsButtons = ({ record }: { record: UserBranchOfficeDeliveryMan }) => (
    <Space>
      <Tooltip title="Editar">
        <Button
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => navigate('/repartidores/editar', {
            state: {
              data: record, type: 'update'
            }
          })}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#ec9822' }}
        />
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() => deleteDeliveryMan(record)}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#d34745' }}
        />
      </Tooltip>
    </Space>
  )

  const columns: ColumnsType<UserBranchOfficeDeliveryMan> = [
    { title: 'Nombre', dataIndex: 'name', key: 'name', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Correo', dataIndex: 'email', key: 'email', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Compañia', dataIndex: 'company', key: 'company', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Sucursal', dataIndex: 'branchOffice', key: 'branchOffice', onHeaderCell: () => ({ style: headerStyle }) },
    {
      title: 'Acciones', dataIndex: 'actions', key: 'actions', width: '5%',
      render: (_, record: UserBranchOfficeDeliveryMan) => (<ActionsButtons record={record} />),
      onHeaderCell: () => ({ style: headerStyle })
    },
  ]

  return (
    <>
      <Row justify="space-between">
        <Col>
          <h1>
            Repartidores
          </h1>
        </Col>
        <Col>
          <RegisterButton onClick={() => navigate("/repartidores/crear", { state: { type: 'create' } })}>
            Registrar repartidor
          </RegisterButton>
        </Col>
      </Row>
      <br />
      <Form layout='vertical'>
        <Form.Item name='search' style={{ marginBottom: '5px' }}>
          <Search
            enterButton
            onSearch={() => setStaring(true)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar por Nombre, Correo ó Teléfono...'
            style={{ width: '100%' }} />
        </Form.Item>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={deliveryMan}
        locale={{
          emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin repartidores' />
        }}
        loading={{
          spinning: staring,
          tip: 'Cargando información...',
        }}
        pagination={{
          total,
          pageSize: limit,
          onShowSizeChange: (_: any, size: number) => setLimit(size),
          onChange: (page: number) => {
            setStaring(true)
            setPage(page);
          },
          showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
          locale: { items_per_page: '/ página' },
          showSizeChanger: true
        }}
        rowKey='id'
        scroll={{ x: 1000 }}
        size='small'
      />
    </>
  )
}

export default UserBranchOfficeDeliveryManView