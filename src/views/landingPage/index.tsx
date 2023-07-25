
import '../../assets/styles/landingPage.css';
import { Button, Card, Col, Divider, Layout, Row, Space, Tooltip, Typography } from 'antd';
import logo from '../../assets/logo-hmo2.png';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined } from '@ant-design/icons';
import image1 from '../../assets/delivery-bg.jpg';
import image2 from '../../assets/landing-1.png';
import image3 from '../../assets/image-3.jpg';
import CardContent from "./CardContent";

const { Content, Footer } = Layout;
const { Title, Link } = Typography;
const sizes = { xs: 24, md: 8 };

const LandingPage = () => {
  return (
    <Layout>
      <Layout style={{ background: '#28355b' }}>
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
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50, marginBottom: 50 }}>
          <Row
            justify="space-between"
            gutter={[48, 48]}
          >
            <Col xs={24} md={8}>
             {/*  hacer un compoenten para estos cards */}
              <Card
                className='card'
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image1} />}
              >
                <CardContent
                  title='Mayor alcance de clientes'
                  description='Gracias al servicio a domicilio los restaurantes pueden llegar a un mayor número de clientes, principalmente debido a que el rango de alcance aumenta consideradamente en kilómetros. Tu alcance estará por los cielos.'
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className='card'
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image2} width={100} />}
              >
                <CardContent
                  title='Visibilidad de negocio'
                  description='Todo negocio necesita ser reconocido y transmitir una imagen positiva y es obvio que en el caso de los restaurantes cuánto más les conozcan y más comentarios existan sobre ellos mayor será la captación de posibles clientes.'
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className='card'
                style={{ padding: 12, borderRadius: 7 }}
                hoverable
                cover={<img alt="example" src={image3} />}
              >
                <CardContent
                  title='Servicio Integral'
                  description='Nuestro compromiso es hacer que cada uno de nuestros clientes tenga una experiencia de entrega única. Ofrecemos un equilibrio perfecto entre sustentabilidad, tecnología y eficiencia operativa cuando hablamos de delivery service.'
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', color: '#fff' }}>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col {...sizes}>
            <Space direction='vertical'>
              <img src={logo} alt="logo" width="100px" />
              <Link href='#' target='_blank'>
                Empieza hoy y expande tu negocio
              </Link>
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#fff' }}>
              ¿Buscas empleo?
            </Title>
            <Link href='#' target='_blank'>
              Hazte repartido de Delivery HMO
            </Link>
          </Col>
          <Col xs={24} md={8}>
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
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Intégrate con nosotros
            </Title>
            <Link href='#' target='_blank'>
              Empieza hoy tu negocio
            </Link>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#fff' }}>
              Intégrate con nosotros
            </Title>
            <Link href='#' target='_blank'>
              Empieza hoy tu negocio
            </Link>
          </Col>
          <Col xs={24} md={8}>
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
                  onClick={() => console.log('facebook social media')}
                  size="middle"
                  style={{ color: '#d3d3d3' }}
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
                  onClick={() => console.log('google social media')}
                  size="middle"
                  style={{ color: '#d3d3d3' }}
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
                  onClick={() => console.log('instagram social media')}
                  size="middle"
                  style={{ color: '#d3d3d3' }}
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

export default LandingPage;