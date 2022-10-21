import { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import logoLogin from '../../assets/logo.jpeg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { UserAdmin } from '../../interfaces/user';
import DynamicContentForm from '../../components/DynamicContentForm';

const initUserAdmin: UserAdmin = {
  active: true,
  company: '',
  description: '',
  email: '',
  image: '',
  name: '',
  phone: '',
  role: 'Administrador',
}

const Seller = () => {
  const [user, setUser] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState<boolean>(false);
  const sizes = {
    xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6
  }

  return (
 
     

            
              <Row >
                <Col md={8}>
                  <Form  layout="vertical">
                    <DynamicContentForm inputs={[
                      {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Nombre Vendedor",
                        name: "name",
                        rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                        value: user.name,
                        onChange: (e) => setUser({ ...user, name: e.target.value })

                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Compañia",
                        name: "company",
                        rules: [{ required: true, message: 'Favor de escribir la company.' }],
                        value: user.company,
                        onChange: (e) => setUser({ ...user, company: e.target.value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Descripcion",
                        name: "description",
                        rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
                        value: user.description,
                        onChange: (e) => setUser({ ...user, description: e.target.value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "email",
                        label: "Email",
                        name: "email",
                        rules: [{ required: true, message: 'Favor de ingresar un email.' }],
                        value: user.email,
                        onChange: (e) => setUser({ ...user, email: e.target.value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "text",
                        label: "Foto",
                        name: "image",
                        rules: [{ required: true, message: 'Favor de ingresar una image.' }],
                        value: user.image,
                        onChange: (e) => setUser({ ...user, image: e.target.value })
                      }, {
                        ...sizes,
                        type: "input",
                        typeInput: "number",
                        label: "Telefono",
                        name: "phone",
                        rules: [{ required: true, message: 'Favor de ingresar un telefono.' }],
                        value: user.phone,
                        onChange: (e) => setUser({ ...user, phone: e.target.value })
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


    
     
    
  )
}

export default Seller;