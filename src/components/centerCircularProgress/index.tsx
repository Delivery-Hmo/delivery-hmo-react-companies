import { FC } from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  height?: string | number;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CenterCircularProgress: FC<Props> = ({ height }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height }}>
      <Spin indicator={antIcon} style={{ color: "#304878" }} />
    </div>
  )
}

export default CenterCircularProgress;