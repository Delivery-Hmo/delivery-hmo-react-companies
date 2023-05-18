import { FC } from 'react';
import ImgCrop, { ImgCropProps } from "antd-img-crop";

const Crop: FC<ImgCropProps> = (props) => {
  return (
    <ImgCrop
      quality={0.7}
      rotationSlider
      aspectSlider
      showGrid
      showReset
      modalTitle="Editar"
      modalCancel="Cancelar"
      modalOk="Aceptar"
      resetText="Reiniciar"
     {...props}
    />
  
  )
}

export default Crop;