import { Button, Col, message, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { get } from '../../service';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../../components/registerButton';

const Branches = () => {
  const { userAdmin } = useAuth();
  const [staring, setStaring] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(!userAdmin) return;

    const controller = new AbortController();

    const init = async () => {
      try {
        const branches = await get("branchOffice/listByUserAdmin", controller);
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
      <Row justify='space-between'>
        <Col>
          <h1>
            Mis sucursales
          </h1>
        </Col>
        <Col>
          <RegisterButton onClick={() => navigate("/sucursales/crear")}>
            Registar sucursal
          </RegisterButton>
        </Col>
      </Row>
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

export default Branches;
