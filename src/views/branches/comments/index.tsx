import { FC } from "react";
import Modal from "../../../components/modal"
import useGet from "../../../hooks/useGet";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Comments: FC<Props> = ({ open, onClose }) => {
  const { loading } = useGet<CommentsBranchOffice[]>('commentsBranchOffice/list');
  return (
    <Modal
      title="Comentarios"
      open={open}
      onCancel={onClose}
      confirmLoading={loading}
      okButtonProps={{
        style: {
          display: "none"
        }
      }}
    >

    </Modal>
  )
}

export default Comments