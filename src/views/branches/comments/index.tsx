import { Empty, Skeleton } from "antd";
import { FC, useMemo } from "react";
import Modal from "../../../components/modal"
import useGet from "../../../hooks/useGet";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";
import { Get } from "../../../components/table";
import CardComment from "./cardComment";

interface Props {
  open: boolean;
  onClose: () => void;
  idBranchOffice: string;
}

const { PRESENTED_IMAGE_SIMPLE } = Empty;

const Comments: FC<Props> = ({ open, onClose, idBranchOffice }) => {
  const url = useMemo(() => `commentsBranchOffice/list?page=1&limit=10&idBranchOffice=${idBranchOffice}`, [idBranchOffice]);
  const { loading, response } = useGet<Get<CommentsBranchOffice>>(url, !Boolean(idBranchOffice));

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
      {
        loading
        ? <Skeleton avatar paragraph={{ rows: 4 }} />
        : !response?.list.length
          ? <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin comentarios.' />
          : response?.list.map((comment) => (
            <CardComment
              key={comment.id}
              comment={comment}
            />
          ))
      }
    </Modal>
  )
}

export default Comments