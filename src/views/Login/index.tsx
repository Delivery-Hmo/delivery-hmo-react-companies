import { FC, useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import '../../assets/styles/login.css';
import RecoveryForm from './recoveryForm';
import LoginForm from './loginForm';

interface Props {
  open: boolean;
}

const Login: FC<Props> = ({ open }) => {
  const [currentForm, setCurrentForm] = useState<string>('login');

  useEffect(() => {
    if (!open) setCurrentForm('login');
  }, [open])

  const DynamicForm = () => {
    if (currentForm === 'recovery') return <RecoveryForm />;
    return <LoginForm setCurrentForm={setCurrentForm} />;
  }

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

export default Login;