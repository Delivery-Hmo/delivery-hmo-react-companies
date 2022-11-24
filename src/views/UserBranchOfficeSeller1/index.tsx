import { useState, useEffect, useMemo } from 'react'
import { Button, Col, Empty, message, Row, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';
import { UserBranchOfficeSeller as InterfaceSeller } from './create';
import { useAuth } from '../../context/authContext';
import { get } from '../../services';

const { PRESENTED_IMAGE_SIMPLE } = Empty;

const UserBranchOfficeSeller = () => {
  const navigate = useNavigate();
  const { userAdmin } = useAuth();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [sellers, setSellers] = useState<InterfaceSeller[]>([])
  const [loading, setLoading] = useState(false)

  const headerStyle = {
    fontWeight: 'bold',
  }

  const ActionsButtons = ({ record }: { record: InterfaceSeller }) => (
    <Space>
      <Tooltip title="Editar">
        <Button
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => navigate('/vendedores/editar', { state: {
            id: record.id, type: 'update'
          }})}
          size="middle"
          style={{ color: '#fff', backgroundColor: '#ec9822'}}
        />
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() => console.log("Eliminar...", record)}
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
        const list = await get(`userBranchOfficeSeller/list?page=${page}&limit=${limit}`, controller);
        setSellers(list);
      } catch (error) {
        console.log(error);
        message.error("Error al obtener los vendedores");
      } finally {
        setLoading(false);
      }
    }

    init();

    return () => {
      controller.abort();
    }
  }, [limit, page, userAdmin])

  const pagination = useMemo(() => {
    if( sellers.length > 0) {
      let size = page, total = 10; // ? preguntar por info para paginación
      return {
        total,
        pageSize: limit,
        onShowSizeChange: ( _: number, newSize: number)  => ( size = newSize ),
        onChange: (page: number) => {
          setLimit(size);
          setPage(page);
        },
        showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} de ${total} registros.`,
        locale: { items_per_page: '/ página' },
        showSizeChanger: true
      }
    }
  }, [limit, page, sellers.length])

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
      <Table
        bordered
        columns={columns}
        dataSource={sellers}
        locale={{
          emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin vendedores'/>
        }}
        loading={{
          spinning: loading,
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