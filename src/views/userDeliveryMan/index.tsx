import { useState, useEffect } from 'react'
import { Col, Empty, Form, Input, message, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';
import { useAuth } from '../../context/authContext';
import { get } from '../../services';
import { UserDeliveryMan } from '../../interfaces/user';

interface Get {
  list: UserDeliveryMan[];
  total: number;
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const { Search } = Input
const headerStyle = {
  fontWeight: 'bold',
};

const UserDeliveryManView = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deliveryMan, setDeliveryMan] = useState<UserDeliveryMan[]>([])
  const [staring, setStaring] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!userAdmin || !staring) return;

    const controller = new AbortController();
    const init = async () => {
      try {
        const { list, total } = await get<Get>(`userDeliveryMan/listByUserAdmin?page=${page}&limit=${limit}&search=${search}`, controller);

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

  const columns: ColumnsType<UserDeliveryMan> = [
    { title: 'Nombre', dataIndex: 'name', key: 'name', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Correo', dataIndex: 'email', key: 'email', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Compañia', dataIndex: 'company', key: 'company', onHeaderCell: () => ({ style: headerStyle }) },
    { title: 'Sucursal', dataIndex: 'branchOffice', key: 'branchOffice', onHeaderCell: () => ({ style: headerStyle }) },
    {
      title: 'Acciones', dataIndex: 'actions', key: 'actions', width: '5%',
      //render: (_, record: userDeliveryMan) => (<ActionsButtons record={record} />),
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
          <RegisterButton onClick={() => navigate("/repartidores/registrar", { state: { type: 'create' } })}>
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
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={deliveryMan}
        locale={{
          emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin repartidores' />
        }}
        loading={staring}
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
      />
    </>
  )
}

export default UserDeliveryManView