import { Button, Card, Col, Divider, Layout, Menu, Modal, Row, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import '../../assets/styles/LandingPage.css'
import logo from '../../assets/logo-hmo2.png';
import { FacebookOutlined, GoogleOutlined, IdcardOutlined, InstagramOutlined, UserOutlined, } from '@ant-design/icons'
import image1 from '../../assets/delivery-bg.jpg';
import image2 from '../../assets/landing-1.png';
import image3 from '../../assets/image-3.jpg';
import Login from '../Login';

const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;

interface MenuItems {
  key: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void
}

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const menuItems: MenuItems[] = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: 'Iniciar Sesión',
      onClick: () => setOpen(true)
    },
    {
      key: '1',
      icon: <IdcardOutlined />,
      label: 'Registrarse',
      onClick: () => console.log('Registrarse')
    },
  ]

  const CardContent = (title: string, description: string) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div style={{
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        padding: "5px",
        color: "#304878",
      }}>
        {title}
      </div>
      <div style={{
        textAlign: "center",
        fontSize: "14px",
        padding: "5px",
      }}>
        {description}
      </div>
    </div>
  )

  return (
    <Layout>
      <Header>
        <div className="logo">
          <img src={logo} alt="logo" width="150px" height="45px" />
        </div>
        <Menu
          className='customclass'
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          mode="horizontal"
          items={menuItems}
        />
      </Header>

      <Layout style={{ background: "#f0a818" }}>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
            {/* Main content */}
          </div>
        </Content>

        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50, marginBottom: 50 }}>
          <Row
            justify="space-between"
            gutter={[48, 48]}
          >
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Card
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image1} />}
              >
                {
                  CardContent(
                    "Mayor alcance de clientes",
                    "Gracias al servicio a domicilio los restaurantes pueden llegar a un mayor número de clientes, principalmente debido a que el rango de alcance aumenta consideradamente en kilómetros.",
                  )
                }
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Card
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image2} width={100} />}
              >
                {
                  CardContent(
                    "Visibilidad de negocio",
                    "Todo negocio necesita ser reconocido y transmitir una imagen positiva y es obvio que en el caso de los restaurantes cuánto más les conozcan y más comentarios existan sobre ellos mayor será la captación de posibles clientes.",
                  )
                }
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
              <Card
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image3} />}
              >
                {
                  CardContent(
                    "Servicio Integral",
                    "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum dolor sit amet, consectetur adipis.",
                  )
                }
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Login />
      </Modal>

      <Footer style={{ textAlign: 'center', color: '#fff' }}>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Intégrate con nosotros
            </Title>
            <Link href='#' target='_blank'>
              Empieza hoy y expande tu negocio
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              ¿Buscas empleo?
            </Title>
            <Link href='#' target='_blank'>
              Hazte repartido de Delivery HMO
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Información de la Empresa
            </Title>
            <Link href='#' target='_blank'>
              Acerca de Delivery HMO
            </Link>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Intégrate con nosotros
            </Title>
            <Link href='#' target='_blank'>
              Empieza hoy tu negocio
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Intégrate con nosotros
            </Title>
            <Link href='#' target='_blank'>
              Empieza hoy tu negocio
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Sígue nuestras redes sociales
            </Title>
            <Space>
              <Tooltip
                title="Facebook"
                placement="bottom"
              >
                <Button
                  icon={<FacebookOutlined />}
                  shape="circle"
                  onClick={() => console.log("facebook social media")}
                  size="middle"
                  style={{ color: "#d3d3d3" }}
                  type="link"
                />
              </Tooltip>
              <Tooltip
                title="Google"
                placement="bottom"
              >
                <Button
                  icon={<GoogleOutlined />}
                  shape="circle"
                  onClick={() => console.log("google social media")}
                  size="middle"
                  style={{ color: "#d3d3d3" }}
                  type="link"
                />
              </Tooltip>
              <Tooltip
                title="Instagram"
                placement="bottom"
              >
                <Button
                  icon={<InstagramOutlined />}
                  shape="circle"
                  onClick={() => console.log("instagram social media")}
                  size="middle"
                  style={{ color: "#d3d3d3" }}
                  type="link"
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
        <Divider />
        <span >Delivery HMO {new Date().getFullYear()} &#xa9;</span>
      </Footer>
    </Layout>
  )
}

export default LandingPage