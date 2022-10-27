import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Avatar, Button, Form, Input, message } from 'antd'

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../../../assets/styles/Login.css'
import { auth } from '../../../firebaseConfig'

interface Props {
  setCurrentForm: Dispatch<SetStateAction<string>>;
}

interface Account {
  email: string;
  password: string;
}

interface UserAdmin {
  uid?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  description: string;
  active: boolean;
}

const LoginForm: FC<Props> = ({ setCurrentForm }) => {
  const [account, setAccount] = useState<Account>({ email: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async () => {
    if (loading) return
    try {
      setLoading(true)

      await signInWithEmailAndPassword(auth, account.email, account.password)
    } catch (error) {
      console.log(error)
      message.error('Error, datos incorrectos.')
      setLoading(false)
    }
  }

  const apiFetch = async (user: UserAdmin) => {
    try {
      const createUserAdmin = await fetch('https://www.deliapihmo.xyz/userAdmin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (createUserAdmin.status !== 201) {
        console.log('error creating', createUserAdmin)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/userinfo.email') // permiso correo
      const result = await signInWithPopup(getAuth(), provider)
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if (additional?.isNewUser) {
        const userInfo: UserAdmin = {
          uid: user.uid,
          name: user?.displayName || '',
          email: user?.email || '',
          active: true,
          phone: user?.phoneNumber || '6621000000',
          description: 'creado desde provider de google',
          company: 'Amosay'
        }

        await apiFetch(userInfo)
      }
    } catch (e) {
      console.log(e)
      message.error('Error, al iniciar con Google.')
    }
  }

  const signInFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider()
      provider.addScope('email') // permiso correo
      const result = await signInWithPopup(getAuth(), provider)
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if (additional?.isNewUser) {
        const userInfo: UserAdmin = {
          uid: user.uid,
          name: user?.displayName || '',
          email: user?.email || '',
          active: true,
          phone: user?.phoneNumber || '6621111111',
          description: 'creado desde provider de facebook',
          company: 'facebook'
        }

        await apiFetch(userInfo)
      }
    } catch (e) {
      console.log(e)
      message.error('Error, al iniciar con Facebook.')
    }
  }

  return (
  <>
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
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
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
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
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
              style={{
              }}
            />
          }
          onClick={signInGoogle}
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
              style={{}}
            />
          }
          onClick={signInFacebook}
          shape="round"
          size="large"
          style={{ backgroundColor: '#eeeeee' }}
          type='default'

        >
            Continuar con Facebook
        </Button>
      </div>
    </Form>
    <br/>
  </>
  )
}

export default LoginForm
