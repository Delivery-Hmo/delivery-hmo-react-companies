import { FC } from "react";
import { Button, Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface Props {
  clearMap: () => void;
}

const HeaderMap: FC<Props> = ({ clearMap }) => {
  return (
    <>
      <Row justify="space-between">
        <Col>
          <b>Ubicación y radio de entrega</b>
        </Col>
        <Button
          icon={<ReloadOutlined />}
          onClick={clearMap}
        />
      </Row>
      <br />
    </>
  )
}

export default HeaderMap