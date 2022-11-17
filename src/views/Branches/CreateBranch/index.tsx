import { Col, Form, Row } from 'antd';
import { useState } from 'react';
import SaveButton from '../../../components/SaveButton';

const CreateBranch = () => {
  const [saving, setSaving] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <h1>
            Registrar sucursales
          </h1>
        </Col>
      </Row>
      <Form>
        <Form.Item
          style={{
            flexDirection: 'column',
            padding: 0
          }}
        >
          <SaveButton
            htmlType="submit"
            loading={saving}
          >
            Guardar
          </SaveButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateBranch;