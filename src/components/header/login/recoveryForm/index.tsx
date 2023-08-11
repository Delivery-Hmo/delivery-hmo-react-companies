import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../../../../assets/styles/login.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../../firebaseConfig'
import { ruleEmail } from "../../../../constants"

const RecoveryForm = () => {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onRecoverPassword = async () => {
    if (!loading) {
      try {
        setLoading(true)
        await sendPasswordResetEmail(auth, email)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className="app-login-title">
        <span>Recuperar contraseña</span>
      </div>
      <Form onFinish={onRecoverPassword}>
        <Form.Item
          name="email"
          rules={[ruleEmail]}
          hasFeedback
          style={{ marginBottom: '10px' }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            size='large'
          />
        </Form.Item>
        <Form.Item
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
            Recuperar contraseña
          </Button>
        </Form.Item>
      </Form>
      <br />
    </>
  )
}

export default RecoveryForm;