import { useState, useEffect, useMemo } from 'react'
import { Button, Col, Empty, Form, Input, message, Row, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/RegisterButton';
import { UserBranchOfficeSeller as InterfaceSeller } from './CreateUserBranchOfficeSeller';
import { useAuth } from '../../context/AuthContext';
import { get, patch } from '../../service';
import { dialogDelete } from '../../utils';

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const { Search } = Input

const UserBranchOfficeSeller = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState<InterfaceSeller[]>([])
  const [staring, setStaring] = useState(true)
  const [search, setSearch] = useState("")

  const headerStyle = {
    fontWeight: 'bold',
  }

  const deleteSeller = async ( record: InterfaceSeller) => {
    try {
      const { id } = record
    const fun = ()=> patch(`userBranchOfficeSeller/disable`, { id, active: false });
    await dialogDelete(fun, "Vendedor eliminado con éxito.")
    setStaring(true)
    } catch (error) {
      console.error(error)
    }
  }

  const ActionsButtons = ({ record }: { record: InterfaceSeller }) => (
    <Space>
      <Tooltip title="Editar">
        <Button
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => navigate('/vendedores/editar', { state: {
            data: record, type: 'update'
          }})}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#ec9822'}}
        />
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() => deleteSeller(record)}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#d34745'}}
        />
      </Tooltip>
    </Space>
  )

  const columns: ColumnsType<InterfaceSeller> = [
    {
      title: 'Nombre', dataIndex: 'name', key: 'name',
      onHeaderCell: () => ({ style: headerStyle})
    },
    { title: 'Correo', dataIndex: 'email', key: 'email', onHeaderCell: () => ({ style: headerStyle})},
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', onHeaderCell: () => ({ style: headerStyle})},
    { title: 'Descripción', dataIndex: 'description', key: 'description', onHeaderCell: () => ({ style: headerStyle})},
    {
      title: 'Acciones', dataIndex: 'actions', key: 'actions', width: '5%',
      render: (_, record: InterfaceSeller) => (<ActionsButtons record={record}/>),
      onHeaderCell: () => ({ style: headerStyle})
    },
  ]

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

  const pagination = useMemo(() => {
      return {
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
      }
  }, [limit, total])

  return (
    <>
      <Row justify="space-between">
        <Col>
          <h1>
            Vendedores
          </h1>
        </Col>
        <Col>
          <RegisterButton onClick={() => navigate("/vendedores/crear", { state: { type: 'create'}})}>
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
        pagination={pagination}
        rowKey='id'
        scroll={{ x: 1000 }}
        size='small'
      />
    </>
  )
}

export default UserBranchOfficeSeller