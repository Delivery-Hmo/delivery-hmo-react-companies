import { FC } from 'react';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '../registerButton';

interface Props {
  title: string;
  pathCreate: string;
}

const textButtons: Record<string, string> = {
  "Sucursales": "sucursal",
  "Vendedores": "vendedor"
};

const HeaderView: FC<Props> = ({ title, pathCreate }) => {
  const navigate = useNavigate();

  return (
    <>
      <Row justify='space-between'>
        <Col>
          <h1>
            {title}
          </h1>
        </Col>
        <Col>
          <RegisterButton onClick={() => navigate(pathCreate)}>
            {"Registar " + textButtons[title]}
          </RegisterButton>
        </Col>
      </Row>
      <br />
    </>
  )
}

export default HeaderView;