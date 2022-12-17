import React, { useState, useEffect } from 'react'
import {
  Card, Col, Row, Avatar, Divider, Form, Tabs, message, Button, Spin
} from 'antd'
import SaveButton from './../../components/saveButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { UserOutlined, AliwangwangOutlined } from '@ant-design/icons'
import DynamicContentForm from '../../components/dynamicContentForm'
import { UserAdmin } from '../../interfaces/userAdmin'
import { get, put } from '../../services'
import { useAuth } from '../../context/authContext'

const initUserAdmin: UserAdmin = {
  id: '',
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
  const { user: userFirebase, userAdmin, setUserAdmin } = useAuth()
  const [form] = Form.useForm()
  const [staring, setStaring] = useState(true);
  const [user, setUser] = useState<UserAdmin>(initUserAdmin)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }
  const onEditProfile = async () => {
    try {
      if (user.email !== userAdmin?.email) {
        console.log("cambio")
      }
      setLoading(true)
      setIsUpdate(true)
      await put("userAdmin/update", user)
      message.success("Datos modificados con éxito.");
    } catch (error) {
      message.error("Error al editar los datos." + error);
    } finally {
      setLoading(false)
      setIsUpdate(false)
    }

  }
  const onFinish = async () => {
    if (user.password !== user.repeatPassword) {
      message.error('Las contraseñas no coinciden.', 4)
    }
  }
  const istPassword = [
    {
      label: 'Actualizar Perfil',
      key: '1',
      children:
        <>
          <Row>
            <Col md={12}>
              <Form form={form} layout="vertical" onFinish={onEditProfile}>
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
                  },
                  {
                    ...sizes,
                    type: 'input',
                    typeInput: 'text',
                    label: 'Telefono',
                    name: 'phone',
                    rules: [
                      { required: true, message: 'Favor de ingresar un telefono.' },
                      { pattern: /^(?:\d*)$/, message: "Solo caracteres numericos.", },
                      { max: 10, message: 'Maximo 10 numeros' },
                    ],
                    value: user.phone,
                    onChange: (value) => setUser({ ...user, phone: value })
                  },
                  {
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
                  <SaveButton htmlType="submit" loading={loading}>
                    Guardar
                  </SaveButton>
                </Form.Item>

              </Form>
            </Col>
          </Row>
        </>,
    }
  ]

  const isPassword = [
    istPassword[0],
    {
      label: 'Cambiar Contraseña',
      key: '2',
      children: <>
        <Row>
          <Col md={12}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <DynamicContentForm inputs={[
                {
                  ...sizes,
                  type: 'input',
                  typeInput: 'email',
                  label: 'Email',
                  name: 'email',
                  rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                  value: user.email,
                  onChange: (value) => setUser({ ...user, email: value })
                },
                {
                  type: 'input',
                  typeInput: 'password',
                  label: 'Contraseña',
                  name: 'password',
                  rules: [{ required: true, message: 'Favor de escribir la contraseña del vendedor.' }],
                  value: user.password,
                  onChange: (value: string) => setUser({ ...user, password: value }),
                  ...sizes,
                },
                {
                  type: 'input',
                  typeInput: 'password',
                  label: 'Confirmar Contraseña',
                  name: 'confirmPassword',
                  rules: [{ required: true, message: 'Favor de confirmar la contraseña del vendedor.' }],
                  value: user.repeatPassword,
                  onChange: (value: string) => setUser({ ...user, repeatPassword: value }),
                  ...sizes,
                },
              ]} />
              <Form.Item >
                <SaveButton htmlType="submit" loading={loading}>
                  Guardar
                </SaveButton>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>,
    }
  ]

  useEffect(() => {
    setUser({ ...user, ...userAdmin })
    form.setFieldsValue({ ...user, ...userAdmin })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAdmin])

  useEffect(() => {
    if (!userAdmin || !isUpdate) return;
    const init = async () => {
      try {
        const responce = await get(`userAdmin/getByUid?uid=${userAdmin.uid}`);
        setUser({ ...user, ...responce })
        setUserAdmin(responce)
        form.setFieldsValue(responce)
      } catch (error) {
        message.error("Error al los datos del perfil.");
      } finally {
        setStaring(false);
      }
    }

    init();


  }, [user, isUpdate, form, userAdmin, setUserAdmin])

  return (
    <>
      <Row gutter={15}>
        <Col {...sizes} >
          <Card title="Mi Perfil" bordered={false} style={{ textAlign: 'center' }}>
            {
              staring && isUpdate ? <Spin /> : (
                <>
                  <Row >
                    <Col xs={24}>
                      <Avatar style={{ backgroundColor: '#87d068' }} size={64} icon={<UserOutlined />} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24}>
                      <span style={{ fontSize: '1.3em' }}>{userAdmin?.name}</span>
                    </Col>

                  </Row>
                  <Divider><AliwangwangOutlined /></Divider>
                  <Row>
                    <Col xs={24}>
                      <b>Correo: </b>
                      <span style={{ fontSize: '1.1em' }}>{userAdmin?.email}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Compañia: </b> <span style={{ fontSize: '1.1em' }}>{!userAdmin?.company ? "Sin compañia." : userAdmin?.company}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Celular: </b>
                      <span style={{ fontSize: '1.1em' }}>{!userAdmin?.phone ? "Sin celular." : userAdmin?.phone}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Descripciòn: </b> <span style={{ fontSize: '1.1em' }}>{!userAdmin?.description ? "Sin descripciòn." : userAdmin?.description}</span>
                    </Col>
                  </Row>
                </>
              )
            }
          </Card>
        </Col>
        <Col xs={24} md={24} lg={17}>
          <Card title="Editar: Datos Mi Perfil" bordered={false}>
            {
              userFirebase?.providerData[0]?.providerId !== "password" ? (
                <Tabs
                  defaultActiveKey="1"
                  items={isPassword}
                />
              ) : (
                <Tabs
                  defaultActiveKey="1"
                  items={istPassword}
                />
              )
            }

          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Perfil
