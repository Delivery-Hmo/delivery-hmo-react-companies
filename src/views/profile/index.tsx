import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Col, Row, Avatar, Divider, Form, Tabs, message, Spin, FormRule, UploadFile } from 'antd';
import DynamicForm from '../../components/dynamicForm';
import { UserOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { get, put } from '../../services';
import { useAuth } from '../../context/authContext';
import { UserAdmin } from '../../interfaces/user';
import { initUserAdmin } from '../../constants';
import { updateEmail, updatePassword, User } from 'firebase/auth';
import { setImagesToState } from "../../utils/functions";

const Perfil = () => {
  const { user: userFirebase, userAdmin, loading: loadingUserAdmin } = useAuth();
  const [form] = Form.useForm();
  const [user, setUser] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState<boolean>(false);

  const { password, confirmPassword, email } = user;

  const onEditProfile = useCallback(async () => {
    setLoading(true);

    try {
      await put<UserAdmin>("userAdmin/update", {...user});
      message.success("Datos de perfil actualizados con éxito.", 4);

    } catch (error) {
      console.log(error);
      message.error("Error al actualizar los datos.");
    } finally {
      setLoading(false);
    }
  }, [user])

  const onEditAuth = useCallback(async () => {
    setLoading(true);

    try {
      if (password && password !== confirmPassword) {
        message.error('Las contraseñas no coinciden.', 4);
        return;
      }

      if (userFirebase?.email !== email) {
        //esta validacion hay que hacerla en el back en branchOffice ya se hace
        const userAdminRegistered = await get<boolean>("userAdmin/verifyEmail?email=" + email);

        if (userAdminRegistered) {
          message.error('El usuario ya esta registrado.', 4);
          return;
        }

        await updateEmail(userFirebase as User, email);
        await put("userAdmin/update", { email });
      }

      if (password) {
        await updatePassword(userFirebase as User, password);
      }

      message.success("Datos de sesión actualizados con éxito.", 4);
    } catch (error) {
      console.log(error);
      message.error('Error al actualizar los datos.');
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }, [email, password, userFirebase, confirmPassword])

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' },
  ], [password])

  const items = useMemo(() => {
    const istPassword = [
      {
        label: 'Actualizar datos de perfil',
        key: '1',
        children: <DynamicForm
          layout="vertical"
          form={form}
          loading={loading}
          onFinish={onEditProfile}
          inputs={[
            {
              md: 6,
              typeControl: 'input',
              typeInput: 'text',
              label: 'Nombre vendedor',
              name: 'name',
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: user.name,
              onChange: (value) => setUser({ ...user, name: value })
            }, {
              md: 12,
              typeControl: 'input',
              typeInput: 'text',
              label: 'Empresa',
              name: 'company',
              rules: [{ required: true, message: 'Favor de escribir la company.' }],
              value: user.company,
              onChange: (value) => setUser({ ...user, company: value })
            },
            {
              md: 6,
              typeControl: 'phone',
              label: 'Teléfono',
              name: 'phone',
              value: user.phone,
              onChange: (value) => setUser({ ...user, phone: value })
            },
            {
              md: 24,
              typeControl: 'textarea',
              typeInput: 'text',
              label: 'Descripción',
              name: 'description',
              rules: [{ required: true, message: 'Favor de seleccionar su descripción.' }],
              value: user.description,
              onChange: (value) => setUser({ ...user, description: value })
            },
            {
              typeControl: "file",
              label: "Logo empresa",
              name: "image",
              value: user.image,
              maxCount: 1,
              accept: "image/png, image/jpeg",
              onChange: (value: UploadFile<any>[]) => setUser({ ...user, image: value }),
              md: 24,
              styleFI: { display: "flex", justifyContent: "center" },
            }
          ]}
        />
      }
    ]

    const isPassword = [
      istPassword[0],
      {
        label: 'Actualizar datos de sesión',
        key: '2',
        children: <DynamicForm
          form={form}
          loading={loading}
          onFinish={onEditAuth}
          inputs={[
            {
              md: 12,
              typeControl: 'input',
              typeInput: 'email',
              label: 'Email',
              name: 'email',
              value: email,
              onChange: (value) => setUser({ ...user, email: value })
            },
            {
              typeControl: 'input',
              typeInput: 'password',
              label: 'Contraseña',
              name: 'password',
              rules: rulesPassword,
              value: password,
              onChange: (value: string) => setUser({ ...user, password: value }),
              md: 6,
            },
            {
              typeControl: 'input',
              typeInput: 'password',
              label: 'Confirmar Contraseña',
              name: 'confirmPassword',
              rules: rulesPassword,
              value: confirmPassword,
              onChange: (value: string) => setUser({ ...user, confirmPassword: value }),
              md: 6,
            },
          ]}
        />
      }
    ]

    if (userFirebase?.providerData[0]?.providerId === "password") return isPassword;

    return istPassword;
  }, [userFirebase, user, setUser, loading, email, password, confirmPassword, onEditAuth, onEditProfile, rulesPassword, form])

  useEffect(() => {
    if (loadingUserAdmin) return;

    const _userAdmin = setImagesToState({...userAdmin!});

    setUser(_userAdmin);
    form.setFieldsValue(_userAdmin);
  }, [userAdmin, form, loadingUserAdmin])

  return (
    <>
      <Row gutter={15} style={{ marginTop: 20 }}>
        <Col md={6}>
          <Card title="Mi Perfil" bordered={false} style={{ textAlign: 'center' }}>
            <h3 >Empresa</h3>
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
                      <b>Empresa: </b> <span style={{ fontSize: '1.1em' }}>{userAdmin?.company || "Sin compañia."}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Celular: </b>
                      <span style={{ fontSize: '1.1em' }}>{userAdmin?.phone || "Sin teléfono."}</span>
                    </Col>
                    <Col xs={24}>
                      <b>Descripción: </b> <span style={{ fontSize: '1.1em' }}>{userAdmin?.description || "Sin descripción."}</span>
                    </Col>
                  </Row>
                </>
              )
            }
          </Card>
        </Col>
        <Col md={18}>
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