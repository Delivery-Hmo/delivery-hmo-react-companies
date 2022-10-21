import React, { useState, FC } from 'react'
import { Card, Col, Row } from 'antd'
import '../../assets/styles/Login.css'
import RegisterForm from './Forms/RegisterForm'
import RecoveryForm from './Forms/RecoveryForm'
import LoginForm from './Forms/LoginForm'

interface Props {
  open: boolean;
}

const Login: FC<Props> = ({ open }) => {
  const [currentForm, setCurrentForm] = useState<string>('login')

  const DynamicForm = () => {
    if (currentForm === 'register') return <RegisterForm />
    if (currentForm === 'recovery') return <RecoveryForm />
    return <LoginForm setCurrentForm={setCurrentForm} />
  }

  React.useEffect(() => {
    if (!open) setCurrentForm('login')
  }, [open])

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
        <DynamicForm />
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
