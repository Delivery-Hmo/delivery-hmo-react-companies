import { useState, useEffect } from 'react'
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
const headerStyle = {
  fontWeight: 'bold',
};

const UserBranchOfficeSellerView = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState<UserBranchOfficeSeller[]>([])
  const [staring, setStaring] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if(!userAdmin || !staring) return;

    const controller = new AbortController();
    const init = async () => {
      try {
        const {list, total} = await get(`userBranchOfficeSeller/listByUserAdmin?page=${page}&limit=${limit}&search=${search}`, controller);
        setSellers(list);
        setTotal(total);
      } catch (error) {
        console.log(error);
        message.error("Error al obtener los vendedores");
      } finally {
        setStaring(false);
      }
    }

    init();

    return () => {
      controller.abort();
    }
  }, [limit, page, search, staring, userAdmin])

  const columns: ColumnsType<UserBranchOfficeSeller> = [
    {
      title: 'Nombre', dataIndex: 'name', key: 'name',
      onHeaderCell: () => ({ style: headerStyle})
    },
    { title: 'Correo', dataIndex: 'email', key: 'email', onHeaderCell: () => ({ style: headerStyle})},
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', onHeaderCell: () => ({ style: headerStyle})},
    { title: 'Descripción', dataIndex: 'description', key: 'description', onHeaderCell: () => ({ style: headerStyle})},
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
      onHeaderCell: () => ({ style: headerStyle})
    },
  ]

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
          style={{marginBottom: '5px'}}
        >
          <Search
            enterButton
            onSearch={()=> setStaring(true)}
            onChange={(e)=> setSearch(e.target.value)}
            placeholder='Buscar por Nombre, Correo ó Teléfono...'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={sellers}
        locale={{
          emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin vendedores'/>
        }}
        loading={{
          spinning: staring,
          tip: 'Cargando información...',
        }}
        pagination={{
          total,
          pageSize: limit,
          onShowSizeChange: (_: any, size:number) => setLimit(size),
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

export default UserBranchOfficeSellerView