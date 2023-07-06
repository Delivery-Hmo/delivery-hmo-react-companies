import { FC } from 'react';
import { Modal as ModalAntd, ModalProps } from 'antd';

const Modal: FC<ModalProps> = (props) => {
  return (
    <ModalAntd cancelText="Cancelar" okText="Aceptar" {...props} />
  );
};

export default Modal;