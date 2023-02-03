import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card, Col, Row, Avatar, Divider, Form, Tabs, message, Spin
} from 'antd';
import SaveButton from './../../components/saveButton';
import { UserOutlined, AliwangwangOutlined } from '@ant-design/icons'
import DynamicContentForm from '../../components/dynamicContentForm'
import { put } from '../../services'
import { useAuth } from '../../context/authContext'
import { UserAdmin } from '../../interfaces/user';
import { initUserAdmin, rulesPhoneInput } from '../../constants';
import { updateEmail, updatePassword, User } from 'firebase/auth';

const Perfil = () => {
  const { user: userFirebase, userAdmin, setUserAdmin } = useAuth();
  const [form] = Form.useForm();
  const [user, setUser] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState<boolean>(false);

  const { password, repeatPassword, email } = user;

  const onEditProfile = useCallback(async () => {
    setLoading(true);

    try {
      const _userAdmin = await put("userAdmin/update", user);

      setUserAdmin(_userAdmin);

      message.success("Datos de perfil actualizados con éxito.", 4);

    } catch (error) {
      console.log(error);

      message.error("Error al actualizar los datos.");
    } finally {
      setLoading(false);
    }
  }, [setUserAdmin, user])

  const onEditAuth = useCallback(async () => {
    setLoading(true);

    try {
      if ((password || repeatPassword) && password !== repeatPassword) {
        message.error('Las contraseñas no coinciden.', 4);
        return;
      }

      if (userFirebase?.email !== email) {
        await updateEmail(userFirebase as User, email);
      }

      if (!password || !repeatPassword) return;

      await updatePassword(userFirebase as User, password);

      message.success("Datos de sesión actualizados con éxito.", 4);
    } catch (error) {
      console.log(error);
      message.error('Error al actualizar los datos.');
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }, [email, password, repeatPassword, userFirebase])

  const items = useMemo(() => {
    const istPassword = [
      {
        label: 'Actualizar datos de perfil',
        key: '1',
        children: <Form form={form} layout="vertical" onFinish={onEditProfile}>
          <DynamicContentForm inputs={[
            {
              md: 6,
              type: 'input',
              typeInput: 'text',
              label: 'Nombre Vendedor',
              name: 'name',
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: user.name,
              onChange: (value) => setUser({ ...user, name: value })
            }, {
              md: 12,
              type: 'input',
              typeInput: 'text',
              label: 'Compañia',
              name: 'company',
              rules: [{ required: true, message: 'Favor de escribir la company.' }],
              value: user.company,
              onChange: (value) => setUser({ ...user, company: value })
            },
            {
              md: 6,
              type: 'input',
              typeInput: 'text',
              label: 'Teléfono',
              name: 'phone',
              rules: rulesPhoneInput,
              value: user.phone,
              onChange: (value) => setUser({ ...user, phone: value })
            },
            {
              md: 24,
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
      }
    ]

    const isPassword = [
      istPassword[0],
      {
        label: 'Actualizar datos de sesión',
        key: '2',
        children: <Form form={form} layout="vertical" onFinish={onEditAuth}>
          <DynamicContentForm inputs={[
            {
              md: 12,
              type: 'input',
              typeInput: 'email',
              label: 'Email',
              name: 'email',
              rules: [{ required: true, message: 'Favor de ingresar un email.', type: "email" }],
              value: email,
              onChange: (value) => setUser({ ...user, email: value })
            },
            {
              type: 'input',
              typeInput: 'password',
              label: 'Contraseña',
              name: 'password',
              rules: [
                { required: password !== "", message: 'Favor de escribir la contraseña del vendedor.' },
                { min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }
              ],
              value: password,
              onChange: (value: string) => setUser({ ...user, password: value }),
              md: 6,
            },
            {
              type: 'input',
              typeInput: 'password',
              label: 'Confirmar Contraseña',
              name: 'confirmPassword',
              rules: [
                {
                  required: password !== "",
                  message: 'Favor de confirmar la contraseña del vendedor.'
                },
                { min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }
              ],
              value: repeatPassword,
              onChange: (value: string) => setUser({ ...user, repeatPassword: value }),
              md: 6,
            },
          ]} />
          <Form.Item >
            <SaveButton htmlType="submit" loading={loading}>
              Guardar
            </SaveButton>
          </Form.Item>
        </Form>
      }
    ]

    if (userFirebase?.providerData[0]?.providerId === "password") return isPassword;
    
    return istPassword;
  }, [userFirebase, user, setUser, form, loading, email, password, repeatPassword, onEditAuth, onEditProfile,])

  useEffect(() => {
    if (!userAdmin) return;

    setUser(userAdmin);
    form.setFieldsValue(userAdmin);
  }, [userAdmin, form])

  return (
    <>
      <Row gutter={15} style={{ marginTop: 20 }}>
        <Col md={6} >
          <Card title="Mi Perfil" bordered={false} style={{ textAlign: 'center' }}>
            {
              !userAdmin ? <Spin /> : (
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
                      <b>Compañia: </b> <span style={{ fontSize: '1.1em' }}>{userAdmin?.company || "Sin compañia."}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Celular: </b>
                      <span style={{ fontSize: '1.1em' }}>{userAdmin?.phone || "Sin teléfono."}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Descripciòn: </b> <span style={{ fontSize: '1.1em' }}>{userAdmin?.description || "Sin descripciòn."}</span>
                    </Col>
                  </Row>
                </>
              )
            }
          </Card>
        </Col>
        <Col xs={24} md={24} lg={17}>
          <Card title="Editar: Datos Mi Perfil" bordered={false}>
            <Tabs
              defaultActiveKey="1"
              items={items}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Perfil;