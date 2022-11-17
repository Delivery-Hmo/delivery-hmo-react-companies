import React, { useState, useEffect } from 'react'
import {
  Card, Col, Row, Avatar, Divider, Form, Tabs, message, Button
} from 'antd'
import { UserOutlined, AliwangwangOutlined, SettingOutlined } from '@ant-design/icons'
import DynamicContentForm from '../../components/DynamicContentForm'
import { UserAdmin } from '../../interfaces/userAdmin'
import { put } from '../../service'
import {useAuth} from '../../context/AuthContext'

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
  const {userAdmin} = useAuth()

  const [user, setUser] = useState<UserAdmin>(initUserAdmin)
  const [loading, setLoading] = useState<boolean>(false)
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }

  const onEditProfile = async () => {
    try {
      const responce = await put("userAdmin/update", user);
      console.log(responce);
    } catch (error) {
      message.error("Error al editar los datos.");
      console.log(error);
    } finally {
      setLoading(true)
    }
 
  }

  const onFinish = async () => {
    if (user.password !== user.repeatPassword) {
      message.error('Las contraseñas no coinciden.', 4)
    }
  }

  useEffect(() => {
    console.log(userAdmin)
  }, [userAdmin])
  

  return (
    <>
    <Row gutter={15}>
        <Col xs={24} md={6} >
          <Card title="Mi Perfil" bordered={false} style={{ textAlign: 'center' }}>
            <Row >
              <Col xs={24}>
                <Avatar style={{ backgroundColor: '#87d068' }} size={64} icon={<UserOutlined />} />
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
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
         
             <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: 'Actualizar Perfil',
                  key: '1',
                  children: 
                  <>
                    <Row>
                      <Col md={12}>
                        <Form layout="vertical" onFinish={onEditProfile}>
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
                                  typeInput: 'email',
                                  label: 'Email',
                                  name: 'email',
                                  rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                                  value: user.email,
                                  onChange: (value) => setUser({ ...user, email: value })
                                }, {
                                  ...sizes,
                                  type: 'input',
                                  typeInput: 'text',
                                  label: 'Telefono',
                                  name: 'phone',
                                  rules: [
                                    { required: true, message: 'Favor de ingresar un telefono.' }, 
                                    {pattern: /^(?:\d*)$/,message: "Solo caracteres numericos.",},
                                    { max: 2, message: 'Maximo 10 numeros' },  
                                  ],
                                  value: user.phone,
                                  onChange: (value) => setUser({ ...user, phone: value })
                                }, {
                                  ...sizes,
                                  type: 'textarea',
                                  typeInput: 'text',
                                  label: 'Descripciòn',
                                  name: 'description',
                                  rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
                                  value: user.description,
                                  onChange: (value) => setUser({ ...user, description: value })
                                }
                              ]} />
                          <Form.Item >
                              <Button style={{ background: '#f0a818' }} htmlType="submit" loading={loading}>
                                Guardar
                              </Button>
                          </Form.Item>
                        
                        </Form>
                      </Col>
                    </Row>
                  </>,
                },
                {
                  label: 'Cambiar Contraseña',
                  key: '2',
                  children: <>
                  <Row>
                    <Col md={12}>
                      {/* <Form layout="vertical" onFinish={onFinish}>
                       
                      </Form> */}
                      <div style={{ textAlign: 'right' }}>
                        <Button style={{ background: '#f0a818' }} htmlType="submit" loading={loading}>
                          Guardar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  </>,
                },
              ]}
            />
          </Card>
        </Col>
        </Row>
</>
  )
}

export default Perfil
