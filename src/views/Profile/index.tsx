import React, { useState } from 'react'
import {
  Card, Col, Row, Avatar, Divider, Form, Tabs, message, Button
} from 'antd'
import { UserOutlined, AliwangwangOutlined } from '@ant-design/icons'
import DynamicContentForm from '../../components/DynamicContentForm'
import { UserAdmin } from '../../interfaces/userAdmin'

const initUserAdmin: UserAdmin = {
  uid: '',
  active: true,
  company: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  password: '',
  repeatPassword: '',
  role: ''
}

const Perfil = () => {
  const [user, setUser] = useState<UserAdmin>(initUserAdmin)
  const [loading, setLoading] = useState<boolean>(false)
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }

  const onFinish = async () => {
    if (user.password !== user.repeatPassword) {
      message.error('Las contraseñas no coinciden.', 4)
    }
    setLoading(true)
  }

  return (
    <>
    <Row gutter={15}>
        <Col xs={24} md={6} >
          <Card title="Mi Perfil" bordered={false} style={{ textAlign: 'center' }}>
            <Row >
              <Col>
                <Avatar style={{ backgroundColor: '#87d068' }} size={64} icon={<UserOutlined />} />
              </Col>
            </Row>
            <Row>
              <Col>
                <span style={{ fontSize: '1.3em' }}>David German</span>
              </Col>

            </Row>
            <Divider><AliwangwangOutlined /></Divider>
            <Row>
              <Col xs={24}>
                  <b>Correo: </b>
                  <span style={{ fontSize: '1.1em' }}> jdgerman@hotmail.com</span>
              </Col>

              <Col xs={24}>
                  <b>Celular: </b>
                  <span style={{ fontSize: '1.1em' }}> 6621074622</span>
              </Col>
              <Col xs={24}>
                  <b>Compañia: </b> <span style={{ fontSize: '1.1em' }}> Delivery</span>
              </Col>
              <Col xs={24}>
                  <b>Descripciòn: </b> <span style={{ fontSize: '1.1em' }}> Usuario de Prueba</span>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={17}>
          <Card title="Editar: Datos Mi Perfil" bordered={false}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
             <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Actualizar Perfil" key="1">
              <Row>
                <Col md={8}>
                  <Form layout="vertical" onFinish={onFinish}>
                    <DynamicContentForm inputs={[
                      {
                        ...sizes,
                        type: 'input',
                        typeInput: 'text',
                        label: 'Nombre Vendedor',
                        name: 'name',
                        rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                        value: user.name,
                        onChange: (value) => setUser({ ...user, name: value })
                      }, {
                        ...sizes,
                        type: 'input',
                        typeInput: 'text',
                        label: 'Compañia',
                        name: 'company',
                        rules: [{ required: true, message: 'Favor de escribir la company.' }],
                        value: user.company,
                        onChange: (value) => setUser({ ...user, company: value })
                      }, {
                        ...sizes,
                        type: 'input',
                        typeInput: 'text',
                        label: 'Descripcion',
                        name: 'description',
                        rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
                        value: user.description,
                        onChange: (value) => setUser({ ...user, description: value })
                      }, {
                        ...sizes,
                        type: 'input',
                        typeInput: 'email',
                        label: 'Email',
                        name: 'email',
                        rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                        value: user.email,
                        onChange: (value) => setUser({ ...user, email: value })
                      }, {
                        ...sizes,
                        type: 'input',
                        typeInput: 'number',
                        label: 'Telefono',
                        name: 'phone',
                        rules: [{ required: true, message: 'Favor de ingresar un telefono.' }],
                        value: user.phone,
                        onChange: (value) => setUser({ ...user, phone: value })
                      }
                    ]} />
                  </Form>
                  <div style={{ textAlign: 'right' }}>
                    <Button style={{ background: '#f0a818' }} htmlType="submit" loading={loading}>
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cambiar Contraseña" key="2">
                C
              </Tabs.TabPane>
            </Tabs>
          </Form>
          </Card>
        </Col>
        </Row>
</>
  )
}

export default Perfil
