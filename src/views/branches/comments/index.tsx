<<<<<<< Updated upstream
import { FC } from "react";
=======
import { Empty, Skeleton } from "antd";
import { FC, useMemo } from "react";
>>>>>>> Stashed changes
import Modal from "../../../components/modal"
import useGet from "../../../hooks/useGet";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";

interface Props {
  open: boolean;
  onClose: () => void;
}

<<<<<<< Updated upstream
const Comments: FC<Props> = ({ open, onClose }) => {
  //const { loading } = useGet<CommentsBranchOffice[]>('commentsBranchOffice/list');
=======
const { PRESENTED_IMAGE_SIMPLE } = Empty;

const Comments: FC<Props> = ({ open, onClose, idBranchOffice }) => {
  const url = useMemo(() => `commentsBranchOffice/list?page=1&limit=10&idBranchOffice=${idBranchOffice}`, [idBranchOffice]);
  const { loading, response } = useGet<Get<CommentsBranchOffice>>(url, !Boolean(idBranchOffice));

>>>>>>> Stashed changes
  return (
    <Modal
      title="Comentarios"
      open={open}
      onCancel={onClose}
      //confirmLoading={loading}
      okButtonProps={{
        style: {
          display: "none"
        }
      }}
    >
<<<<<<< Updated upstream

=======
      {
        loading
        ? <Skeleton avatar paragraph={{ rows: 4 }} />
        : !response?.list.length
          ? <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin comentarios.' />
          : response?.list.map((comment) => (
            <CardComments
              key={comment.id}
              comment={comment}
            />
          ))
      }
>>>>>>> Stashed changes
    </Modal>
  )
}

export default Comments