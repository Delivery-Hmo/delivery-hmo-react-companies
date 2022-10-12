import { Button, Card, Col, Collapse, Divider, Layout, Menu, Modal, Row, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import '../../assets/styles/LandingPage.css'
import logo from '../../assets/logo-hmo2.png';
import { FacebookOutlined, GoogleOutlined, IdcardOutlined, InstagramOutlined, UserOutlined, } from '@ant-design/icons'
import image1 from '../../assets/delivery-bg.jpg';
import image2 from '../../assets/landing-1.png';
import image3 from '../../assets/image-3.jpg';
import Login from '../Login';

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;
const sizes = {
  xs:24, sm:24, md:8, lg:8, xl:8, xxl:8,
}

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

      {/* #f5b92f
      #28355b
      #f7f7e0
      #ccb986
      #fbe4cc
      #242117
      #f3cab2
      #876c3b
      #a4a8ae
      #fbfbf7
      #a2894b
      #fae2c2
      #e2c8c2
      #748490
      #f9f9ec
      #667494
      #c3acac
      #d0d7df  */}

      {/* MAIN CONTENT */}
      <Layout style={{ background: "#28355b" }}>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50 }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <div>
              <div className="main-title">
                Delivery HMO
              </div>
              <div className="main-description">
                descriptions
              </div>
            </div>
          </div>
        </Content>

        {/* CONTENT 1 */}
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
                    "Gracias al servicio a domicilio los restaurantes pueden llegar a un mayor número de clientes, principalmente debido a que el rango de alcance aumenta consideradamente en kilómetros. Tu alcance estará por los cielos.",
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
                    "Nuestro compromiso es hacer que cada uno de nuestros clientes tenga una experiencia de entrega única. Ofrecemos un equilibrio perfecto entre sustentabilidad, tecnología y eficiencia operativa cuando hablamos de delivery service.",
                  )
                }
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      {/* Content Collapse */}
      <Layout style={{ background: "#d0d7df" }}>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50, marginBottom: 50 }}>
          <Row
            justify="space-between"
          >
            <Col span={24}>
              <Title style={{color: "#304878"}}>
                ¿Sigues con dudas? Pegúntanos:
              </Title>
            </Col>
            <Col span={24}>
            <Collapse
              className='collapse-content'
              defaultActiveKey={['1']}
              ghost
            >
              <Panel header="Lorem Ipsum" key="1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tellus libero, nec placerat nibh semper sed. Donec suscipit, turpis faucibus eleifend maximus, neque orci porttitor erat, et rutrum enim nisi quis quam. Sed condimentum consectetur libero, vel maximus orci lacinia quis. Nullam sodales sem eros, in tempor tellus tincidunt quis. Mauris non sollicitudin neque. Aenean sollicitudin velit eu consectetur egestas. Proin magna augue, consequat id lacus non, sodales lobortis urna.</p>
              </Panel>
              <Panel header="Lorem Ipsum 2" key="2">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tellus libero, nec placerat nibh semper sed. Donec suscipit, turpis faucibus eleifend maximus, neque orci porttitor erat, et rutrum enim nisi quis quam. Sed condimentum consectetur libero, vel maximus orci lacinia quis. Nullam sodales sem eros, in tempor tellus tincidunt quis. Mauris non sollicitudin neque. Aenean sollicitudin velit eu consectetur egestas. Proin magna augue, consequat id lacus non, sodales lobortis urna.</p>
              </Panel>
              <Panel header="Lorem Ipsum 3" key="3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tellus libero, nec placerat nibh semper sed. Donec suscipit, turpis faucibus eleifend maximus, neque orci porttitor erat, et rutrum enim nisi quis quam. Sed condimentum consectetur libero, vel maximus orci lacinia quis. Nullam sodales sem eros, in tempor tellus tincidunt quis. Mauris non sollicitudin neque. Aenean sollicitudin velit eu consectetur egestas. Proin magna augue, consequat id lacus non, sodales lobortis urna.</p>
              </Panel>
              <Panel header="Lorem Ipsum 4" key="4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tellus libero, nec placerat nibh semper sed. Donec suscipit, turpis faucibus eleifend maximus, neque orci porttitor erat, et rutrum enim nisi quis quam. Sed condimentum consectetur libero, vel maximus orci lacinia quis. Nullam sodales sem eros, in tempor tellus tincidunt quis. Mauris non sollicitudin neque. Aenean sollicitudin velit eu consectetur egestas. Proin magna augue, consequat id lacus non, sodales lobortis urna.</p>
              </Panel>
            </Collapse>
            </Col>
          </Row>
        </Content>
      </Layout>

      {/* MODAL LOGIN */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Login />
      </Modal>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center', color: '#fff' }}>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col {...sizes}>
            <Space direction='vertical'>
              <img src={logo} alt="logo" width="100px"/>
              <Link href='#' target='_blank'>
                Empieza hoy y expande tu negocio
              </Link>
            </Space>
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