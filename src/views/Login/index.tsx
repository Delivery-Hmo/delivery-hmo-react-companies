import { useState } from 'react';
import { Avatar, Button, Card, Col, Form, Input, message, Row } from 'antd';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import '../../assets/styles/Login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { auth } from '../../firebaseConfig';

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
      const result = await signInWithPopup(getAuth(), provider)
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
      const result = await signInWithPopup(getAuth(), provider);
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
    <div className='app-login-wrapper'>
      <Card
        className='app-login-card'
        style={{
          background: '#fff',
          border: 'none',
          borderRadius: 7,
          padding: '0.5em',
        }}
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
              size='large'
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
              size='large'
            />
          </Form.Item>
          <div
            style={{
              flexDirection: 'column',
              padding: 0
            }}
          >
            <Button
              block
              className="login-button"
              htmlType="submit"
              loading={loading}
              shape="round"
              size="large"
              type="primary"
            >
              Entrar
            </Button>
            <Button
              block
              className="login-button"
              icon={
                <Avatar
                  src='/google.png'
                  size="small"
                  className='icon-google'
                  style={{
                  }}
                />
              }
              onClick={signInGoogle}
              shape="round"
              size="large"
              style={{ backgroundColor: '#eeeeee'}}
              type='default'
            >
              Continuar con Google
            </Button>
            <Button
              block
              className="login-button"
              icon={
                <Avatar
                  src='/facebook.png'
                  size="small"
                  className='icon-facebook'
                  style={{}}
                />
              }
              onClick={signInFacebook}
              shape="round"
              size="large"
              style={{ backgroundColor: '#eeeeee'}}
              type='default'

            >
              Continuar con Facebook
            </Button>
          </div>
        </Form>
        <br/>
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
      </Card>
    </div>
  )
}

export default Login;