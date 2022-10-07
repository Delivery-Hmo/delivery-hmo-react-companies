import { Button, Col, Row, Table } from "antd";

const Home = () => {
  return (
    <div>
      <Row justify="space-between">
        <Col>
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
        locale={{
          emptyText: <div style={{fontSize: 18}}>
            Sin sucursales
          </div> 
        }}
      />
    </div>
  )
}

export default Home;