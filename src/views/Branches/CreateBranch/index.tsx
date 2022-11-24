import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import SaveButton from '../../../components/saveButton';
import DynamicContentForm from '../../../components/dynamicContentForm';
import { initBranch } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import { CustomInput } from '../../../interfaces';

const CreateBranch = () => {
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
  const [saving] = useState(false);

  const { name, email, facebook, website, salesGoalByMonth, phones, schedule } = branch;

  return (
    <div>
      <Row>
        <Col>
          <h1>
            Registrar sucursal
          </h1>
        </Col>
      </Row>
      <Form layout="vertical">
        <DynamicContentForm 
          inputs={[
            {
              md: 16,
              type: "input",
              typeInput: "text",
              label: "Nombre",
              name: "name",
              rules: [{ required: true, message: 'Favor de escribir el Nombre.' }],
              value: name,
              onChange: (value: string) => setBranch({...branch, name: value})
            },
            {
              md: 8,
              type: "input",
              typeInput: "number",
              label: "Meta ventas por mes",
              name: "salesGoalByMonth",
              value: salesGoalByMonth,
              onChange: (value: string) => setBranch({...branch, salesGoalByMonth: +value})
            },
            {
              md: 8,
              type: "input",
              typeInput: "email",
              label: "Correo electronico",
              name: "email",
              value: email,
              onChange: (value: string) => setBranch({...branch, email: value})
            },
            {
              md: 8,
              type: "input",
              label: "Facebook",
              name: "faceebok",
              value: facebook,
              onChange: (value: string) => setBranch({...branch, facebook: value})
            },
            {
              md: 8,
              type: "input",
              label: "Sitio web",
              name: "website",
              value: website,
              onChange: (value: string) => setBranch({...branch, website: value})
            }
          ]}
         />
        <DynamicContentForm 
          inputs={
            phones.map((phone, index) => ({
              md: 4,
              type: "input",
              typeInput: "number",
              label: `Teléfono ${index + 1}`,
              name: `phone${index}`,
              rules: index === 0 
                ? [{ required: true, message: 'Favor de escribir un Teléfono de 10 digitos.', max: 10, min: 10 }] 
                : undefined,
              value: phone,
              styleFI: { marginBottom: 0 },
              onChange: (value: string) => setBranch({...branch, phones: phones.map((p, i) => i === index ? +value : p) })
            }) as CustomInput)
          }
        />
        <br />
        <DynamicContentForm 
          inputs={
            schedule.map((s, index) => ({
              md: 6,
              type: "timeRangePicker",
              label: `Teléfono ${index + 1}`,
              name: `phone${index}`,
              value: s,
              onChange: (value: [moment.Moment, moment.Moment]) => 
                setBranch({...branch, schedule: schedule.map((c, i) => i === index ? value : c) })
            }) as CustomInput)
          }
        />
        <br />
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