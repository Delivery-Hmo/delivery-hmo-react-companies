import { useEffect, useState } from 'react'
import DynamicForm from '../../../components/dynamicForm'
import { Card, Form, Grid, message, UploadFile } from 'antd'
import { add } from '../../../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { initCompany, titleForm, urlImageDefaultCompany } from '../../../constants';
import { Company } from '../../../interfaces';
import { TypeRute } from '../../../types';
import HeaderView from "../../../components/headerView";
// import { setImagesToState } from "../../../utils/functions";
// import useAbortController from "../../../hooks/useAbortController";

const { useBreakpoint } = Grid;

const CreateCompany = () => {
  // const abortController = useAbortController();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const screens = useBreakpoint();
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState<Company>(initCompany)


  useEffect(() => {
    let _company = { ...state } as Company | null;
    setType(_company?.id ? "update" : "create");
    if (!_company?.id) return;
    form.setFieldsValue(_company);
    setCompany(_company);
  }, [state, form])

  const onFinish = async () => {
    if (saving) return;
    const _company = { ...company, ...{ image: urlImageDefaultCompany } };
    setSaving(true);
    try {
      if (type === "update") {
        console.log("update")
      } else {
        await add<Company>("Companies", _company)
      }
      message.success('Empresa guardada con éxito.', 4);
      navigate('/empresas')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <HeaderView
        title={titleForm[type]}
        path="/empresas"
        goBack
      />
      <Card>
        <DynamicForm
          form={form}
          layout='vertical'
          loading={saving}
          onFinish={onFinish}
          justify="center"
          inputs={[
            {
              typeControl: 'input',
              typeInput: 'text',
              label: 'Nombre',
              name: 'name',
              rules: [{ required: true, message: 'Favor de escribir el nombre de la empresa.' }],
              value: company.name,
              onChange: (value: string) => setCompany({ ...company, name: value }),
              md: 8
            },
            {
              typeControl: 'input',
              typeInput: 'email',
              label: 'Correo',
              name: 'email',
              value: company.email,
              onChange: (value: string) => setCompany({ ...company, email: value }),
              md: 8
            },
            {
              typeControl: 'phone',
              label: 'Teléfono',
              required: true,
              rules: [{ required: true, message: 'Favor de escribir el telefono de la empresa.' }],
              name: 'phone',
              value: company.phone,
              onChange: (value: string) => setCompany({ ...company, phone: value }),
              md: 8
            },
            // {
            //   typeControl: "file",
            //   label: screens.xs ? "" : "Logo Empresa",
            //   name: "image",
            //   value: company.image,
            //   maxCount: 1,
            //   accept: "image/png, image/jpeg",
            //   onChange: (value: UploadFile<any>[]) => setCompany({ ...company, image: value }),
            //   md: 8,
            //   styleFI: { display: "flex", justifyContent: "center" },
            //   multiple: false,
            // },
            {
              typeControl: 'textarea',
              typeInput: 'text',
              label: 'Descripción',
              name: 'address',
              rules: [{ required: true, message: 'Favor de escribir la direccion de la empresa.' }],
              value: company.address,
              onChange: (value: string) => setCompany({ ...company, address: value }),
              md: 24
            }
          ]}
        />
      </Card>
    </div>
  )
}

export default CreateCompany;