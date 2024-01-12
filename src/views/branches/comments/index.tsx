import { Skeleton } from "antd";
import { FC, useMemo, useState } from "react";
import Modal from "../../../components/modal";
import { Get } from "../../../components/table";
import useGet, { PropsUseGet } from "../../../hooks/useGet";
import CardComments from "./card";
import { CommentsBranchOffice } from "../../../interfaces/commentBranchOffice";

interface Props {
  open: boolean;
  onClose: () => void;
  idBranchOffice: string;
}

const Comments: FC<Props> = ({ open, onClose, idBranchOffice }) => {
  const [page, setPage] = useState(1);
  const propsUseGet = useMemo<PropsUseGet>(() => {
    return {
      url: `commentsBranchOffice/list?page=${page}&limit=10&idBranchOffice=${idBranchOffice}`,
      wait: !Boolean(idBranchOffice),
      mergeResponse: true
    };
  }, [page, idBranchOffice]);
  const { loading, response, setResponse } = useGet<Get<CommentsBranchOffice>>(propsUseGet);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loading) return;

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const bottom = Math.floor(scrollHeight - scrollTop) <= clientHeight;

    if (!bottom || !scrollTop || (response?.list.length || 0) >= (response?.total || 0)) return;

    setPage(page + 1);
  };

  return (
    <Modal
      destroyOnClose
      title="Comentarios"
      open={open}
      onCancel={() => {
        setPage(1);
        setResponse({ list: [], total: 0 });
        onClose();
      }}
      confirmLoading={loading}
      okButtonProps={{
        style: {
          display: "none"
        }
      }}
    >
      {
        loading && !response?.list.length
          ? <Skeleton avatar paragraph={{ rows: 4 }} />
          : <div onScroll={onScroll} style={{ minHeight: "60vh", maxHeight: "60vh", overflowY: "auto" }}>
            {
              response?.list.map((comment) => (
                <CardComments
                  key={comment.id}
                  comment={comment}
                />
              ))
            }
            {
              loading && response?.list.length && <Skeleton avatar paragraph={{ rows: 4 }} />
            }
          </div>
      }
    </Modal>
  );
};

export default Comments;