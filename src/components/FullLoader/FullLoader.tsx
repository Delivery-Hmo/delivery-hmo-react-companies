import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FullLoader = () => {
  return <div style={{
    position: 'absolute',
    left: '50%',
    top: '50%',
    WebkitTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
  }}>
    <Spin indicator={antIcon} style={{color: "#304878"}} />
  </div>
}

export default FullLoader;
