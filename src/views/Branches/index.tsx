import { Button, Col, message, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { get } from '../../service/branchOffice';

const Branches = () => {
  const { userAdmin } = useAuth();
  const [staring, setStaring] = useState(true);

  useEffect(() => {
    if(!userAdmin) return;

    const controller = new AbortController();

    const init = async () => {
      try {
        const branches = await get("branchOffice/", controller);
        console.log(branches);
      } catch (error) {
        message.error("Error al obtener las sucursales");
        console.log(error);
      } finally {
        setStaring(false);
      }
    }

    init();

    return () => {
      controller.abort();
    }
  }, [userAdmin])

  return (
    <div>
      <Row>
        <Col md={5}>
          <h1>
            Mis sucursales
          </h1>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {}}
          >
            Registar sucursal
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <Table
        loading={staring}
        locale={{
          emptyText: <div style={{ fontSize: 18 }}>
            Sin sucursales
          </div>
        }}
      />
    </div>
  )
}

export default Branches
