import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import menuItems from './menuItems'

const { Sider } = Layout

const MenuComponent = () => {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(true)
  const location = useLocation()

  const onCollapse = (collapsed: boolean | undefined) => setCollapsed(collapsed)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[location.pathname]}
        items={menuItems.map(item => ({
          key: item.key,
          title: item.title,
          label: item.label,
          icon: item.icon,
          children: item.childrens,
          onClick: () => item.onClick && item.onClick()
        }))}
      />
    </Sider>
  )
}

export default MenuComponent
