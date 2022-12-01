import { useState, useEffect, useMemo } from 'react'
import { Button, Col, Empty, Form, Input, Modal, message, Row, Space, Table, Tooltip } from 'antd';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';
import { UserBranchOfficeSeller as InterfaceSeller } from './createUserBranchOfficeSeller';
import { useAuth } from '../../context/authContext';
import { get, patch } from '../../service';

const { PRESENTED_IMAGE_SIMPLE } = Empty;
const { Search } = Input

const UserBranchOfficeSeller = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sellers, setSellers] = useState<InterfaceSeller[]>([])
  const [staring, setStaring] = useState(true)
  const [search, setSearch] = useState("")

  const headerStyle = {
    fontWeight: 'bold',
  }

  const deleteSeller = ( record: InterfaceSeller) => {
    const { name, id } = record
    Modal.confirm({
      title: "Eliminar",
      icon: <CloseCircleOutlined style={{ color: "red" }} />,
      content: `¿Desea eliminar al Vendedor "${name}"?`,
      okText: "Sí",
      cancelText: "No",
      okButtonProps: { style: { backgroundColor: 'red', color: 'white' } },
      closable: true,
      onOk: async () => {
        try {
          await patch(`userBranchOfficeSeller/disable`, { id, active: false });
          message.success(`El vendedor: ${name}, ha sido eliminado con éxito.`)
          setStaring(true);
        } catch (error) {
          console.log(error);
          message.error('Ocurrió un problema al eliminar al vendedor: ' + name)
        }
      },
    });
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
    if(!userAdmin) return;

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

    if (staring) init();

    return () => {
      controller.abort();
    }
  }, [limit, page, search, staring, userAdmin])

  const pagination = useMemo(() => {
    if( sellers.length > 0) {
      let size = limit;
      return {
        total,
        pageSize: limit,
        onShowSizeChange: ( _: number, newSize: number)  => ( size = newSize ),
        onChange: async (page: number) => {
          try {
            const {list, total} = await get(`userBranchOfficeSeller/listByUserAdmin?page=${page}&limit=${limit}`);
            setSellers(list);
            setTotal(total);
            setLimit(size);
            setPage(page);
          } catch (error) {
            console.log(error);
            message.error("Error al obtener los vendedores");
          } finally {
            setStaring(false);
          }
        },
        showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
        locale: { items_per_page: '/ página' },
        showSizeChanger: true
      }
    }
  }, [limit, sellers.length, total])

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