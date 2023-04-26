import { FC } from 'react';
import { Avatar, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/authContext';
import { Grid } from 'antd';

interface Props {
  collapsed?: boolean;
}

const { useBreakpoint } = Grid;

const RowHeader: FC<Props> = ({ collapsed }) => {
  const { userAdmin } = useAuth();
  const screens = useBreakpoint();

  return (
    <Row
      justify="center"
      style={screens.xs ?
        { textAlign: "center" } :
        { textAlign: "center", backgroundColor: "#304878", marginTop: -19, paddingTop: 20, paddingBottom: 20, borderRadius: "0px 0px 8px 8px" }}
    >
      <Avatar style={{ backgroundColor: "#87D068" }} size={collapsed ? 48 : 64} icon={<UserOutlined />} />
      {
        !collapsed && <div style={screens.xs ?{ color: "black" }:{ color: "white" }}>
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