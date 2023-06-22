import { Skeleton } from "antd";
import { FC, useMemo, useState } from "react";
import Modal from "../../../components/modal"
import { Get } from "../../../components/table";
import useGet from "../../../hooks/useGet";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";

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
      {
        loading
          ? <Skeleton avatar paragraph={{ rows: 4 }} />
          : response?.list.map(comment => (<div>{comment.comment}</div>) )
        }
    </Modal>
  )
}

export default Comments