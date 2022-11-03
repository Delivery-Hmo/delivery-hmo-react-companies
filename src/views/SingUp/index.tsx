import { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Card } from 'antd';
import imgSeller from '../../assets/seller.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../interfaces/user';
import DynamicContentForm from '../../components/DynamicContentForm';
import "./index.css"

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
  const [user, setUser] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState<boolean>(false);
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }
  const onFinish = async () => {
    if (user.password !== user.repeatPassword){
      message.error('Las contraseñas no coinciden.', 4)
      return
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
                        value: user.name,
                        onChange: (value) => setUser({ ...user, name: value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Compañia",
                        name: "company",
                        rules: [{ required: true, message: 'Favor de escribir la company.' }],
                        value: user.company,
                        onChange: (value) => setUser({ ...user, company: value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Descripcion",
                        name: "description",
                        rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
                        value: user.description,
                        onChange: (value) => setUser({ ...user, description: value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "email",
                        label: "Email",
                        name: "email",
                        rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                        value: user.email,
                        onChange: (value) => setUser({ ...user, email: value })
                      },{
                        ...sizes,
                        type: "input",
                        typeInput: "number",
                        label: "Telefono",
                        name: "phone",
                        rules: [{ required: true, message: 'Favor de ingresar un telefono.' }],
                        value: user.phone,
                        onChange: (value) => setUser({ ...user, phone: value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "password",
                        label: "Contraseña",
                        name: "password",
                        rules: [{require: true, message: 'Favor de ingresar una contraseña valida.'}],
                        value: user.password,
                        onChange: (value) => setUser({ ...user, password: value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "password",
                        label: "Repetir Contraseña",
                        name: "repeatPassword",
                        rules: [{require: true, message: 'Favor de ingresar una contraseña valida.'}],
                        value: user.repeatPassword,
                        onChange: (value) => setUser({...user, repeatPassword: value})
                      }
                    ]} />
                  </Form>
                  <div style={{ textAlign: "right" }}>
                    <Button style={{ background: "#f0a818" }} htmlType="submit" loading={loading}>
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
          </>

  )
}

export default SingUp;