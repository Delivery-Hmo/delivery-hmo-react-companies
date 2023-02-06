import { useState, useEffect, useMemo } from 'react'
import { Col, Empty, Form, Input, message, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';
import { useAuth } from '../../context/authContext';
import { get, patch } from '../../services';
import { UserBranchOfficeSeller } from '../../interfaces/user';
import TableActionsButtons from '../../components/tableActionsButtons';

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const { Search } = Input

interface Get {
  list: UserBranchOfficeSeller[];
  total: number;
}

const UserBranchOfficeSellerView = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState<UserBranchOfficeSeller[]>([]);
  const [staring, setStaring] = useState(true);
  const [search, setSearch] = useState("");

  const columns: ColumnsType<UserBranchOfficeSeller> = useMemo(() => [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo', dataIndex: 'email', key: 'email' }, 
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    {
      title: 'Acciones', dataIndex: 'actions', key: 'actions', width: '5%',
      render: (_, record: UserBranchOfficeSeller) => (
        <TableActionsButtons
          record={record}
          onDeleted={() => setStaring(true)}
          fun={() => patch(`userBranchOfficeSeller/disable`, { id: record.id, active: false })}
          messageError="Vendedor eliminado con éxito."
        />
      ),
    },
  ], [])

  useEffect(() => {
    if (!userAdmin || !staring) return;

    const controller = new AbortController();

    const init = async () => {
      try {
        const { list, total } = await get<Get>(`userBranchOfficeSeller/listByUserAdmin?page=${page}&limit=${limit}&search=${search}`, controller);

        setSellers(list);
        setTotal(total);
      } catch (error) {
        console.log(error);
        message.error("Error al obtener los vendedores.");
      } finally {
        setStaring(false);
      }
    }

    init();

    return () => {
      controller.abort();
    }
  }, [limit, page, search, staring, userAdmin])

  return (
    <>
      <Row justify="space-between">
        <Col>
          <h1>
            Vendedores
          </h1>
        </Col>
        <Col>
          <RegisterButton onClick={() => navigate("/vendedores/crear")}>
            Registrar vendedor
          </RegisterButton>
        </Col>
      </Row>
      <br />
      <Form
        layout='vertical'
      >
        <Form.Item
          name='search'
          style={{ marginBottom: '5px' }}
        >
          <Search
            enterButton
            onSearch={() => setStaring(true)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar por nombre, correo ó teléfono...'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={sellers}
        locale={{
          emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin vendedores' />
        }}
        loading={staring}
        pagination={{
          total,
          pageSize: limit,
          onShowSizeChange: (_: any, size: number) => setLimit(size),
          onChange: (page: number) => {
            setStaring(true);
            setPage(page);
          },
          showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
          locale: { items_per_page: '/ página' },
          showSizeChanger: true
        }}
        rowKey='id'
        size='small'
      />
    </>
  )
}

export default UserBranchOfficeSellerView;