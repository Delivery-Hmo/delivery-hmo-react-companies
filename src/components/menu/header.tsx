import React from 'react';
import { Layout, Button } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
const { Header: _Header } = Layout;

const Header: React.FC = () => {

  return (
    <_Header>
      <Button type="primary" style={{ marginTop: "3%", right: "8%" }} icon={<BarsOutlined style={{ fontSize: "140%", marginTop: "8%" }} />} size="large" />
    </_Header>
  );
};

export default Header;
