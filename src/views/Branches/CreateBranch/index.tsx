import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import SaveButton from '../../../components/SaveButton';
import DynamicContentForm from '../../../components/DynamicContentForm';
import { initBranch } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';


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
              md: 8,
              type: "input",
              typeInput: "text",
              label: "Nombre de la sucursal",
              name: "name",
              rules: [{ required: true, message: 'Favor de escribir el nombre de la sucursal.' }],
              value: branch.name,
              onChange: (value: string) => setBranch({...branch, name: value})
            },
            {
              md: 8,
              type: "input",
              typeInput: "text",
              label: "Nombre Vendedor",
              name: "name",
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: branch.name,
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