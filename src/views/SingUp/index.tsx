import { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Card } from 'antd';
import imgSeller from '../../assets/seller.png';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../interfaces/user';
import DynamicContentForm from '../../components/DynamicContentForm';
import "./index.css"
import { post } from '../../service/branchOffice';

const initUserAdmin: UserAdmin = {
  active: true,
  company: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  password: '',
  repeatPassword: '',
}

const SingUp = () => {
  const [userAdmin, setUserAdmin] = useState<UserAdmin>(initUserAdmin); 
  const [loading, setLoading] = useState(false);
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }
  const onFinish = async () => {
    if (userAdmin.password !== userAdmin.repeatPassword) {
      message.error('Las contraseñas no coinciden.', 4)
      return
    }
    if (loading) return;
    
    // if(userAdmin.uid !== ""){
    //   message.error('El usuario ya existe', 4)
    //   return
    // }

    try {
      setLoading(true);
      //falta test magig con el encbezado y inputs en 2 columnas en pantalla grande 1 en android
      //validar que el usuario que no este registrado verificando con el back-end
      const result = await createUserWithEmailAndPassword( getAuth(), userAdmin.email, userAdmin.password as string )
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if (!additional?.isNewUser) return

      const userInfo: UserAdmin = {
        uid: user.uid,
        name: user?.displayName || '',
        email: user?.email || '',
        active: true,
        phone: user?.phoneNumber || '',
        description: '',
        company: '',
      }

      await post('userAdmin/create', userInfo);
    } catch (error) {
      console.log(error);
      message.error('Error al registrarse.', 4)
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 50, marginBottom: 50 }}>

    <Row justify="space-between" gutter={[48, 48]}>
        <Col>
        <Card style={{ padding: 12, borderRadius: 7 }} 
        hoverable 
        cover={<img alt="example" src={imgSeller} />}>
        </Card>
        </Col>
      </Row>
    </Content> */}

      <Row>
        <Col md={8}>
          <Form layout="vertical" onFinish={onFinish}>
            <DynamicContentForm inputs={[
              {
                ...sizes,
                type: "input",
                typeInput: "text",
                label: "Nombre Vendedor",
                name: "name",
                rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                value: userAdmin.name,
                onChange: (value) => setUserAdmin({ ...userAdmin, name: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "text",
                label: "Compañia",
                name: "company",
                rules: [{ required: true, message: 'Favor de escribir la company.' }],
                value: userAdmin.company,
                onChange: (value) => setUserAdmin({ ...userAdmin, company: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "text",
                label: "Descripcion",
                name: "description",
                rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
                value: userAdmin.description,
                onChange: (value) => setUserAdmin({ ...userAdmin, description: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "email",
                label: "Email",
                name: "email",
                rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                value: userAdmin.email,
                onChange: (value) => setUserAdmin({ ...userAdmin, email: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "number",
                label: "Telefono",
                name: "phone",
                rules: [{ required: true, message: 'Favor de ingresar un telefono.' }],
                value: userAdmin.phone,
                onChange: (value) => setUserAdmin({ ...userAdmin, phone: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "password",
                label: "Contraseña",
                name: "password",
                rules: [{ required: true, message: 'Favor de ingresar una contraseña.' }],
                value: userAdmin.password,
                onChange: (value) => setUserAdmin({ ...userAdmin, password: value })
              }, {
                ...sizes,
                type: "input",
                typeInput: "password",
                label: "Repetir Contraseña",
                name: "repeatPassword",
                rules: [{ required: true, message: 'Favor de ingresar una contraseña.' }],
                value: userAdmin.repeatPassword,
                onChange: (value) => setUserAdmin({ ...userAdmin, repeatPassword: value })
              }
            ]} />

            <Form.Item style={{ textAlign: "right" }}>
              <Button style={{ background: "#f0a818" }} htmlType="submit" loading={loading}>
                Guardar
              </Button>
            </Form.Item>
          </Form>

        </Col>
      </Row>
    </>

  )
}

export default SingUp;