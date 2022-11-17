import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import SaveButton from '../../../components/SaveButton';
import DynamicContentForm from '../../../components/DynamicContentForm';
import { initBranch } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import Input from '../../../components/Generics/Input';

const sizes = {
  xs: 24, 
  md: 8
};

const CreateBranch = () => {
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
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
        <DynamicContentForm 
          inputs={[
            {
              ...sizes,
              type: "input",
              typeInput: "text",
              label: "Nombre Vendedor",
              name: "name",
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: branch.totolSales,
              onChange: (value) => console.log(value)
            },
          ]}
         />
        <Form.Item>
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