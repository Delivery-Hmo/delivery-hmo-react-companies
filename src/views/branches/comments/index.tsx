import { Skeleton } from "antd";
import { FC, useMemo, useState } from "react";
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
  const [page, setPage] = useState(1);
  const url = useMemo(() => `commentsBranchOffice/list?page=${page}&limit=10&idBranchOffice=${idBranchOffice}`, [idBranchOffice, page]);
  const { loading, response } = useGet<Get<CommentsBranchOffice>>(url, !Boolean(idBranchOffice), true);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loading) return;

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const bottom = (scrollHeight - scrollTop) < (clientHeight + 2);

    if (!bottom || !scrollTop || (response?.list.length || 0) >= (response?.total || 0)) return;

    setPage(page + 1);
  }

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
      {false ? (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      ) : (
        <div onScroll={onScroll} style={{ minHeight: "60vh", maxHeight: "60vh", overflowY: "auto" }}>
          {
            response?.list.map((comment) => (
              <CardComments
                key={comment.id}
                comment={comment}
              />
            ))
          }
        </div>
      )}
    </Modal>
  )
}

export default Comments