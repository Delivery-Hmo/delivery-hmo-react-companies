import { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import logoLogin from '../../assets/logo.jpeg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { UserAdmin } from '../../interfaces/user';

const initUserAdmin: UserAdmin = {
  active: true,
  company: '',
  description: '',
  email:'',
  image:'',
  name:'',
  phone:'',
  role: 'Administrador',
}

const Seller = () => {
  const [user, setUser] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div style={{ marginTop: "15vh", padding: 30 }}>
      <Row justify="center">
        <Col>
          <div style={{ textAlign: "center" }}>
            <img alt="" height={100} width={300} style={{ marginBottom: 20 }} src={logoLogin}></img>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Nombre Vendedor"
                name="name"
                rules={[{ required: true, message: 'Favor de escribir el nombre.' }]}
              >
                <Input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              </Form.Item>
              <Form.Item
                label="Compañia"
                name="company"
                rules={[{ required: true, message: 'Favor de escribir la company.' }]}
              >
                <Input value={user.company} onChange={(e) => setUser({ ...user, company: e.target.value })} />
              </Form.Item>
              <Form.Item
                label="Descripcion"
                name="description"
                rules={[{ required: true, message: 'Favor de seleccionar su description.' }]}
              >
                <Input value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Favor de ingresar su numero email.' }]}
              >
                <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </Form.Item>
              <Form.Item
                label="Foto"
                name="image"
                rules={[{ required: true, message: 'Favor de ingresar un image.' }]}
              >
                <Input value={user.image} onChange={(e) => setUser({ ...user, image: e.target.value })} />
              </Form.Item>
              <Form.Item
                label="Telefono"
                name="phone"
                rules={[{ required: true, message: 'Favor de ingresar un logo.' }]}
              >
                <Input value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              </Form.Item>
                <div style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Guardar
                  </Button>
                </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Seller;