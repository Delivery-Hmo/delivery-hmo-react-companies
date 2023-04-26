import { useEffect, useMemo, useState } from 'react'
import DynamicContentForm from '../../../components/dynamicContentForm'
import { Card, Col, Form, FormRule, message, Row, UploadFile } from 'antd'
import SaveButton from '../../../components/saveButton';
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { inituserSeller, titleForm } from '../../../constants';
import { UserSeller } from '../../../interfaces/user';
import { TypeRute } from '../../../types';
import { sleep } from "../../../utils/functions";
import HeaderView from "../../../components/headerView";

const CreateuserSeller = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [seller, setSeller] = useState<UserSeller>(inituserSeller)
  const [staring, setStaring] = useState(true);

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !seller.id && seller.password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }
  ], [seller])

  useEffect(() => {
    if (!staring) return;

    const inti = async () => {
      try {
        const _userSeller = state as UserSeller | null;

        setType(_userSeller?.id ? "update" : "create");

        if (!_userSeller) return;

        form.setFieldsValue(_userSeller);
        setSeller(_userSeller);
        await sleep(300);
        setStaring(false);
      } catch (error) {
        console.log(error);
        message.error("Error al cargar el vendedor.", 4);
      }
    }

    inti();
  }, [state, staring, form])

  const onFinish = async () => {
    if (saving) return;

    const { password, confirmPassword } = seller;

    if (password && confirmPassword !== password) {
      message.error('Las contraseñas no coinciden.');
      return;
    }

    setSaving(true);

    delete seller.confirmPassword;

    try {
      if (type === "update") {
        await put(`userSeller/${type}`, seller);
      } else {
        await post(`userSeller/${type}`, seller);
      }

      message.success('Vendedor guardado con éxito.', 4);
      navigate('/vendedores')
    } catch (error) {
      console.log(error);
      message.error(error as string, 4);
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <HeaderView
        title={titleForm[type]}
        path="/sucursales"
        goBack
      />
      <Row>
        <Col md={24}>
          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
          >
            <Card>
              <DynamicContentForm
                inputs={[
                  {
                    typeControl: 'input',
                    typeInput: 'text',
                    label: 'Nombre',
                    name: 'name',
                    rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                    value: seller.name,
                    onChange: (value: string) => setSeller({ ...seller, name: value }),
                    md: 12
                  },
                  {
                    typeControl: 'input',
                    typeInput: 'email',
                    label: 'Correo',
                    name: 'email',
                    value: seller.email,
                    onChange: (value: string) => setSeller({ ...seller, email: value }),
                    md: 12
                  },
                  {
                    typeControl: 'input',
                    typeInput: 'password',
                    label: 'Contraseña',
                    name: 'password',
                    rules: rulesPassword,
                    value: seller.password,
                    onChange: (value: string) => setSeller({ ...seller, password: value }),
                    md: 10
                  },
                  {
                    typeControl: 'input',
                    typeInput: 'password',
                    label: 'Confirmar contraseña',
                    name: 'confirmPassword',
                    rules: rulesPassword,
                    value: seller.confirmPassword,
                    onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
                    md: 10
                  },
                  {
                    typeControl: 'phone',
                    label: 'Teléfono',
                    name: 'phone',
                    value: seller.phone,
                    onChange: (value: string) => setSeller({ ...seller, phone: value }),
                    md: 4
                  },
                  {
                    typeControl: 'textarea',
                    typeInput: 'text',
                    label: 'Descripción',
                    name: 'description',
                    rules: [{ required: true, message: 'Favor de escribir la descripción del vendedor.' }],
                    value: seller.description,
                    onChange: (value: string) => setSeller({ ...seller, description: value }),
                    md: 24
                  },
                  {
                    typeControl: "file",
                    label: "Foto vendedor",
                    name: "image",
                    value: seller.image,
                    maxCount: 1,
                    accept: "image/png, image/jpeg",
                    onChange: (value: UploadFile<any>[]) => setSeller({ ...seller, image: value.map(v => ({ ...v, status: "done" })) })
                  }
                ]}
              />
              <SaveButton
                htmlType='submit'
                loading={saving}
              >
                Guardar vendedor
              </SaveButton>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateuserSeller;