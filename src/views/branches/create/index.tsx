import { useState } from 'react';
import { Card, Col, Form, message, Row } from 'antd';
import SaveButton from '../../../components/saveButton';
import DynamicContentForm from '../../../components/dynamicContentForm';
import { initBranch, rulesPhoneInput } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import { CustomInput } from '../../../interfaces';
import Map from './map';
import { post } from '../../../services';

const CreateBranch = () => {
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
  const [saving, setSaving] = useState(false);

  const { name, email, facebook, website, salesGoalByMonth, phones } = branch;

  const onFinish = async () => {
    if(saving) return;

    if(!branch.radius || branch.center) {
      message.error("El radio de entrega es obligatorio.");
      return;
    }

    if(!branch.latLng) {
      message.error("La ubicación de la sucursal es obligatoria.");
      return;
    }
    
    setSaving(true);

    try {
      console.log(branch);
      
      await post("branchOffice/create", branch);
      
      message.success("Sucursal guardada con exito.");
    } catch (error) {
      console.log(error);
      message.error("Error al guardar la sucursal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Row>
        <Col>
          <h1>Registrar sucursal</h1>
        </Col>
      </Row>
      <Form 
        layout="vertical"
        onFinish={onFinish}
      >
        <Card>
          <h3>Datos</h3>
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
        </Card>
        <br />
        <Card>
          <h3>Teléfonos</h3>
          <DynamicContentForm 
            inputs={
              phones.map((phone, index) => ({
                rules: index === 0 ? rulesPhoneInput : null,
                md: 4,
                type: "phone",
                label: `Teléfono ${index + 1}`,
                name: `phone${index}`,
                value: phone,
                styleFI: { marginBottom: 0 },
                onChange: (value: string) => setBranch({...branch, phones: phones.map((p, i) => i === index ? +value : p) })
              }) as CustomInput)
            }
          />
        </Card>
        <br />
        <Row>
          <Col xs={24}> 
            <Map branch={branch} setBranch={setBranch} />
          </Col>
        </Row>
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
