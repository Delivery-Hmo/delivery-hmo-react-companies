import { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Card, Divider, Avatar } from 'antd';
//import logoLogin from '../../assets/logo.jpeg';
import logo from '../../assets/logo-example.jpg';
import logoBg from '../../assets/delivery-bg.jpg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import '../../assets/styles/Login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

interface Account {
  email: string;
  passowrd: string;
}

interface UserAdmin {
  uid?: string;
  id?: string;
  name: string;
  email: string;
  phone:  string;
  company: string;
  description: string;
  active: boolean;
}

const Login = () => {
  const [account, setAccount] = useState<Account>({email: "", passowrd: ""});
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async () => {
    if(loading) return;
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, account.email, account.passowrd);
    } catch (error) {
      console.log(error);
      message.error("Error, datos incorrectos.");
      setLoading(false);
    }
  }

  const apiFetch = async (user: UserAdmin) => {
    try {
      const createUserAdmin = await fetch('https://www.deliapihmo.xyz/userAdmin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if(createUserAdmin.status !== 201) {
      console.log('error creating', createUserAdmin)
    }
    } catch (error) {
      console.log(error)
    }
  }

  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/userinfo.email') // permiso correo
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if(additional?.isNewUser) {
        let userInfo: UserAdmin = {
          uid: user.uid,
          name: user?.displayName || '',
          email:  user?.email || '',
          active: true,
          phone: user?.phoneNumber || '6621000000',
          description: 'creado desde provider de google',
          company: 'Amosay',
        }

        await apiFetch(userInfo)
      }
    } catch (e) {
      console.log(e);
      message.error("Error, al iniciar con Google.");
    }
  }

  const signInFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email') // permiso correo
      const result = await signInWithPopup(auth, provider);
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if(additional?.isNewUser) {
        let userInfo: UserAdmin = {
          uid: user.uid,
          name: user?.displayName || '',
          email:  user?.email || '',
          active: true,
          phone: user?.phoneNumber || '6621111111',
          description: 'creado desde provider de facebook',
          company: 'facebook',
        }

        await apiFetch(userInfo)
      }

    } catch (e) {
      console.log(e);
      message.error("Error, al iniciar con Facebook.");
    }
  }

  return (
    <div className="app-container">
      <Row justify="center">
        <Col className='main-col'>
          <div className='app-login-wrapper'>
            <Card
              className='app-login-card'
              cover={
                <div className="app-login-bg">
                  <img alt="login-bg" height={200} src={logoBg}/>
                  <div className="app-login-logo">
                    <Avatar
                      src={logo}
                      alt="logo"
                      style={{
                        width: 100,
                        height: 100
                      }}
                    />
                  </div>
                </div>
              }
            >
              <div className="app-login-title">
                <span>Inicio de Sesión</span>
              </div>
              <div className="app-login-subtitle">
                <p>Bienvenido</p>
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout='vertical'
                className='app-login-form'
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Favor de escribir el correo.' }]}
                  hasFeedback
                  style={{ marginBottom: '10px' }}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    value={account.email}
                    onChange={(e) => setAccount({...account, email: e.target.value})}
                    placeholder="Correo"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Favor de escribir la contraseña.' }]}
                  hasFeedback
                  style={{ marginBottom: '10px' }}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={account.passowrd}
                    onChange={(e) => setAccount({...account, passowrd: e.target.value})}
                    placeholder="Contraseña"
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: '10px' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    Entrar
                  </Button>
                </Form.Item>
                <Divider orientation='center' className='divider-or'> ó </Divider>
                {/* icons google - facebook */}
                <Row gutter={[16, 0]} justify="space-evenly">
                  <Col span={12}>
                    <Button
                      type='link'
                      style={{
                        padding: '0 10px',
                        borderRadius: '50px',
                      }}
                      onClick={signInGoogle}
                    >
                      <Avatar
                        src='/google.png'
                        size="large"
                        className='icon-google'
                      />
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      type='link'
                      style={{
                        padding: '0 10px',
                        borderRadius: '50px',
                      }}
                      onClick={signInFacebook}
                    >
                      <Avatar
                        src='/facebook.png'
                        size="large"
                        className='icon-facebook'
                      />
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Divider />
              <Row gutter={[16, 0]} justify="space-evenly">
                <Col span={12}>
                  <a href="#app-store">
                    <img src="/app-store.png" alt="img-app-store" width="130" />
                  </a>
                </Col>
                <Col span={12}>
                  <a href="#google-play">
                    <img src="/google-play.png" alt="img-google-play" width="130" />
                  </a>
                </Col>
              </Row>
              <Divider />
                <div className="app-login-footer">
                    <span >Derechos reservados { new Date().getFullYear() } &#xa9;</span>
                </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login;