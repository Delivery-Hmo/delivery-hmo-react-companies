import React, { useState, FC } from 'react'
import { Card, Col, Row } from 'antd'
import '../../assets/styles/Login.css'
<<<<<<< HEAD
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { auth } from '../../firebaseConfig';
import { UserAdmin } from '../../interfaces/userAdmin';
import { post } from '../../service/branchOffice';
=======
import RegisterForm from './Forms/RegisterForm'
import RecoveryForm from './Forms/RecoveryForm'
import LoginForm from './Forms/LoginForm'
>>>>>>> dev

interface Props {
  open: boolean;
}

<<<<<<< HEAD
type KeysProviders = "facebook" | "google";

const providers: Record<KeysProviders, FacebookAuthProvider | GoogleAuthProvider> = {
  "facebook": new FacebookAuthProvider(),
  "google": new GoogleAuthProvider()
};

const scopes: Record<KeysProviders, string> = {
  "facebook": 'email',
  "google": 'https://www.googleapis.com/auth/userinfo.email'
};
=======
const Login: FC<Props> = ({ open }) => {
  const [currentForm, setCurrentForm] = useState<string>('login')
>>>>>>> dev

  const DynamicForm = () => {
    if (currentForm === 'register') return <RegisterForm />
    if (currentForm === 'recovery') return <RecoveryForm />
    return <LoginForm setCurrentForm={setCurrentForm} />
  }

<<<<<<< HEAD
  const signInWithProvider = async (keyProvider: KeysProviders) => {
    try {
      const provider = providers[keyProvider];
      const scope = scopes[keyProvider];
      provider.addScope(scope);
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;
      const additional = getAdditionalUserInfo(result);

      if(!additional?.isNewUser) return;

      const userInfo: UserAdmin = {
        uid: user.uid,
        name: user?.displayName || '',
        email:  user?.email || '',
        active: true,
        phone: user?.phoneNumber || '',
        description: '',
        company: '',
        role: ''
      };

      await post("userAdmin/create", userInfo);
    } catch (e) {
      console.log(e);
      message.error(`Error, al iniciar con ${keyProvider.toUpperCase()}`);
    }
  }
=======
  React.useEffect(() => {
    if (!open) setCurrentForm('login')
  }, [open])
>>>>>>> dev

  return (
    <div className='app-login-wrapper'>
      <Card
        className='app-login-card'
        style={{
          background: '#fff',
          border: 'none',
          borderRadius: 7,
          padding: '0.5em'
        }}
      >
<<<<<<< HEAD
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
              autoComplete='username'
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
              autoComplete="current-password"
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
              onClick={async () => await signInWithProvider("google")}
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
              onClick={async () => await signInWithProvider("facebook")}
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
=======
        <DynamicForm />
>>>>>>> dev
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

export default Login
