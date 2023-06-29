import { FC } from "react";
import { CalendarOutlined, DeleteOutlined, LineOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import { CommentsBranchOffice } from "../../../../interfaces/commentBranchOffice";
import dayjs from "dayjs";

const { Meta } = Card;

interface Props {
  comment: CommentsBranchOffice
}

const CardComments: FC<Props> = ({ comment: objectComment }) => {
  const { date, comment, user } = objectComment;

  return (
    <Card>
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={user as string}
        description={comment}
      />


      <Row >
        <Col xs={10}>
          <Row gutter={10} justify="center">
            <Col>
              <CalendarOutlined />
            </Col>
            <Col>
              {dayjs(date).format('DD/MM/YYYY hh:mm a')}
            </Col>
          </Row>
        </Col>
        {/* <Col xs={2}>
          |
        </Col>
        <Col xs={11}>
          <DeleteOutlined key="delete" />
        </Col> */}
      </Row>
    </Card>
  );
};

export default CardComments;
