import { Skeleton } from "antd";
import { FC, useMemo } from "react";
import Modal from "../../../components/modal"
import { Get } from "../../../components/table";
import useGet from "../../../hooks/useGet";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";
import CardComments from "./card";


interface Props {
  open: boolean;
  onClose: () => void;
  idBranchOffice: string;
}

const Comments: FC<Props> = ({ open, onClose, idBranchOffice }) => {
  const url = useMemo(() => `commentsBranchOffice/list?page=1&limit=10&idBranchOffice=${idBranchOffice}`, [idBranchOffice]);
  const { loading, response } = useGet<Get<CommentsBranchOffice>>(url, !Boolean(idBranchOffice));

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
      {loading ? (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      ) : (
        response?.list.map((comment) => (
          <CardComments
            key={comment.id}
            comment={comment}
          />
        ))
      )} 
    </Modal>
  )
}

export default Comments