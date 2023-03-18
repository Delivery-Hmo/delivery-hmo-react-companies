import { FC } from 'react';
import { Avatar, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/authContext';

interface RowI {
  collapsed: boolean | undefined;
  style?: Object | undefined;
  styleAvatar?: {};
}

const RowHeader: FC<RowI> = ({ collapsed, style = { color: "white" }, styleAvatar = { backgroundColor: "#87D068" } }) => {
  const { userAdmin } = useAuth();

  return (
    <Row
      justify="center"
      style={{ margin: 15, textAlign: "center" }}
    >
      <Avatar style={styleAvatar} size={collapsed ? 48 : 64} icon={<UserOutlined />} />
      {
        !collapsed && <div style={style}>
          <div style={{ marginTop: 20 }}>
            <b>{userAdmin?.email.toUpperCase()}</b>
          </div>
          <div>
            {userAdmin?.role}
          </div>
        </div>
      }
    </Row>
  )
}

export default RowHeader;
