import { FC, useState } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, getAdditionalUserInfo, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../../../../assets/styles/login.css';
import { auth } from '../../../../firebaseConfig';
import { post } from '../../../../services';
import { UserAdmin } from '../../../../interfaces/user';
import { ruleEmail, rulePassword } from '../../../../constants';
import { useAuth } from '../../../../context/authContext';
import { DS } from "../../../../types";
import useAbortController from "../../../../hooks/useAbortController";

type KeysProviders = 'facebook' | 'google';

interface Props {
  setCurrentForm: DS<string>;
}

interface Account {
  email: string;
  password: string;
}

const providers: Record<KeysProviders, FacebookAuthProvider | GoogleAuthProvider> = {
  facebook: new FacebookAuthProvider(),
  google: new GoogleAuthProvider()
}

const scopes: Record<KeysProviders, string> = {
  facebook: 'email',
  google: 'https://www.googleapis.com/auth/userinfo.email'
};

const LoginForm: FC<Props> = ({ setCurrentForm }) => {
  const abortController = useAbortController();
  const [account, setAccount] = useState<Account>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const { creatingUser, setCreatingUser } = useAuth();

  const onFinish = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, account.email, account.password);
    } catch (error) {
      console.log(error);
      message.error('Error, datos incorrectos.');
      setLoading(false);
    }
  }

  const signInWithProvider = async (keyProvider: KeysProviders) => {
    if (creatingUser) return;

    setCreatingUser(true);

    try {
      const provider = providers[keyProvider];
      const scope = scopes[keyProvider];
      provider.addScope(scope);
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;
      const additional = getAdditionalUserInfo(result);

      if (!additional?.isNewUser) return;

      const userInfo: UserAdmin = {
        uid: user.uid,
        name: user?.displayName || '',
        email: user?.email || '',
        active: true,
        phone: user?.phoneNumber || '',
        description: '',
        role: "Administrador"
      };

      await post('userAdminPublic/create', userInfo, abortController.current!);
    } catch (e) {
      console.log(e);
      message.error(`Error, al iniciar con ${keyProvider.toUpperCase()}`);
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <>
      <div className="app-login-title" style={{ display: "flex", justifyContent: "center" }}>
        <span>Inicio de sesión</span>
      </div>
      <div className="app-login-subtitle" style={{ display: "flex", justifyContent: "center" }}>
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
          rules={[ruleEmail]}
          hasFeedback
          style={{ marginBottom: '10px' }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
            placeholder="Correo"
            size='large'
            autoComplete='username'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[rulePassword]}
          hasFeedback
          style={{ marginBottom: '10px' }}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={account.password}
            onChange={(e) => setAccount({ ...account, password: e.target.value })}
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
          <p
            onClick={() => setCurrentForm('recovery')}
            style={{
              textAlign: 'center',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Recuperar contraseña
          </p>
          <Button
            block
            className="login-button"
            icon={
              <Avatar
                src='/google.png'
                size="small"
                className='icon-google'
              />
            }
            onClick={async () => await signInWithProvider('google')}
            shape="round"
            size="large"
            style={{ backgroundColor: '#eeeeee' }}
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
              />
            }
            onClick={async () => await signInWithProvider('facebook')}
            shape="round"
            size="large"
            style={{ backgroundColor: '#eeeeee' }}
            type='default'
          >
            Continuar con Facebook
          </Button>
        </div>
      </Form>
      <br />
    </>
  )
}

export default LoginForm;