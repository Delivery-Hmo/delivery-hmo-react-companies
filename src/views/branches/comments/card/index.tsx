import { FC } from "react";
import { CalendarOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import { CommentsBranchOffice } from "../../../../interfaces/commentBranchOffice";
import dayjs from "dayjs";
import DeleteButton from "../../../../components/deleteButton";

const { Meta } = Card;

interface Props {
  comment: CommentsBranchOffice
}

const CardComments: FC<Props> = ({ comment: objectComment }) => {
  const { date, comment, user } = objectComment;

  return (
    <Card bodyStyle={{ padding: 0 }} style={{ margin: '10px', padding: '16px' }}>
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={user as string}
        description={comment}
      />

      <hr />
      <Row align="middle">
        <Col xs={11}>
          <Row gutter={10} justify="space-evenly">
            <Col xs={3}>
              <CalendarOutlined />
            </Col>
            <Col xs={19}>
              {dayjs(date).format('DD/MM/YYYY hh:mm a')}
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          <Row justify="space-evenly">
            |
          </Row>
        </Col>
        <Col xs={11}>
          <Row justify="space-evenly">
            <DeleteButton />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CardComments;
