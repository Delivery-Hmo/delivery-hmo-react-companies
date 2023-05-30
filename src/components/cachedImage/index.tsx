import { useEffect, FC, useState, useMemo, CSSProperties } from 'react';
import { Skeleton } from 'antd';
import errorImageUrl from '../../assets/error-image.png';

interface Props {
  imageUrl: string;
  style?: CSSProperties;
}

const CachedImage: FC<Props> = ({ imageUrl, style }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      setImageError(true);
    };
  }, [imageUrl]);

  const styleImage = useMemo(() => ({ borderRadius: 20, ...style }), [style]);

  if (imageError) {
    return (<img src={errorImageUrl} alt="err-img" style={styleImage} />);
  }

  if (loading) {
    return (<Skeleton.Image style={styleImage} active />);
  }

  return (
    <img src={imageUrl} alt={imageUrl} style={styleImage} />
  );
};

export default CachedImage;