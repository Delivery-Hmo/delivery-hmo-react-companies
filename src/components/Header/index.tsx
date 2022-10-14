import React, { useState } from 'react'
import { Layout, Menu, Modal } from 'antd'
import logo from '../../assets/logo-hmo2.png';
import { IdcardOutlined, UserOutlined } from '@ant-design/icons'
import Login from '../../views/Login';


const { Header } = Layout

interface MenuItems {
  key: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void
}

const HeaderComponent = () => {
  const [open, setOpen] = useState(false)

  const menuItems: MenuItems[] = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: 'Iniciar Sesión',
      onClick: () => setOpen(true)
    },
    {
      key: '1',
      icon: <IdcardOutlined />,
      label: 'Registrarse',
      onClick: () => console.log('Registrarse')
    },
  ]

  return (
    <>
      <Header>
        <div className="logo">
          <img src={logo} alt="logo" width="150px" height="45px" />
        </div>
        <Menu
          className='customclass'
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          mode="horizontal"
          items={menuItems}
        />
      </Header>

      {/* MODAL LOGIN */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Login />
      </Modal>
    </>
  )
}

export default HeaderComponent