import { FC } from "react";
import { Button, Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface Props {
  clearUbication: () => void;
  clearRadius: () => void;
}

const HeaderMap: FC<Props> = ({ clearUbication, clearRadius }) => {
  return (
    <>
      <Row justify="start" gutter={10}>
        <Col>
          <b>Ubicación y radio de entrega</b>
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            onClick={clearUbication}
            children="Cambiar ubicación"
          />
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            onClick={clearRadius}
            children="Cambiar radio"
          />
        </Col>
      </Row>
      <br />
    </>
  )
}

export default HeaderMap