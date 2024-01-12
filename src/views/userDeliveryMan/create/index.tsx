import { useEffect, useMemo, useState } from 'react'
import { Form, message, FormRule, UploadFile } from 'antd'
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { initUserDeliveryMan, titleForm } from '../../../constants';
import { BranchOffice, UserDeliveryMan } from '../../../interfaces/user';
import useGet from '../../../hooks/useGet';
import { CustomInput, Option } from '../../../interfaces';
import DynamicForm from "../../../components/dynamicForm";
import useAbortController from "../../../hooks/useAbortController";
import useIsSmallScreen from '../../../hooks/useIsSmallScreen';
import { setImagesToState } from '../../../utils/functions';
import HeaderView from '../../../components/headerView';

type TypeRute = "create" | "update";

const CreateUserDeliveryMan = () => {
  const abortController = useAbortController();
  const [form] = Form.useForm();
  const location = useLocation();
  const isSmallScreen = useIsSmallScreen();
  const navigate = useNavigate();
  const { loading, response: branchOffices } = useGet<BranchOffice[]>("branchOffice/listByUserAdmin");
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState<UserDeliveryMan>(initUserDeliveryMan);


  useEffect(() => {
    let _deliveryMan = { ...state } as UserDeliveryMan | null;

    setType(_deliveryMan?.id ? "update" : "create");

    if (!_deliveryMan?.id) return;

    _deliveryMan = setImagesToState(_deliveryMan);
    form.setFieldsValue(_deliveryMan);
    setDeliveryMan(_deliveryMan);
  }, [state, form])

  const optionsBranchOffices = useMemo<Option[]>(() => {
    const _branchOfficesOptions = (branchOffices?.map(b => ({ text: b.name, value: b.id })) || []) as Option[]
    _branchOfficesOptions.unshift({ text: "Sin sucursal", value: "" })
    return _branchOfficesOptions;
  }, [branchOffices])

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !deliveryMan.id && deliveryMan.password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o más.' },
  ], [deliveryMan.password, deliveryMan.id])

  const onFinish = async () => {
    if (saving) return;

    setSaving(true);

    const _deliveryMan = { ...deliveryMan };
    const { password, confirmPassword } = _deliveryMan;

    if (confirmPassword !== password) {
      message.error('Las contraseñas no coinciden.');
      return;
    }

    delete _deliveryMan.confirmPassword;

    try {
      if (type === "update") {
        await put(`userDeliveryMan/${type}`, _deliveryMan, abortController.current);
      } else {
        await post(`userDeliveryMan/${type}`, _deliveryMan, abortController.current);
      }

      message.success('Repartidor guardado con éxito.', 4);
      navigate('/repartidores')
    } catch (error) {
      console.log(error)
      message.error('Error al guardar el repartidor.', 4);
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <HeaderView
        title={titleForm[type]}
        path="/repartidores"
        goBack
      />
      <DynamicForm
        form={form}
        layout='vertical'
        onFinish={onFinish}
        loading={saving}
        inputs={[
          {
            typeControl: 'input',
            typeInput: 'text',
            label: 'Nombre',
            name: 'name',
            rules: [{ required: true, message: 'Favor de escribir el nombre del repartidor.' }],
            value: deliveryMan.name,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, name: value }),
            md: 12
          },
          {
            typeControl: 'input',
            typeInput: 'text',
            label: 'RFC',
            name: 'rfc',
            rules: [{ required: true, message: 'Favor de escribir el RFC del repartidor.' }],
            value: deliveryMan.rfc,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, rfc: value }),
            md: 12
          },
          {
            typeControl: 'phone',
            label: 'Teléfono',
            name: 'phone',
            value: deliveryMan.phone,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, phone: value }),
            md: 12
          },
          {
            typeControl: 'input',
            typeInput: 'email',
            label: 'Correo',
            name: 'email',
            value: deliveryMan.email,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, email: value }),
            md: 12
          },
          {
            typeControl: 'input',
            typeInput: 'password',
            label: 'Contraseña',
            name: 'password',
            rules: rulesPassword,
            value: deliveryMan.password,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, password: value }),
            md: 12
          },
          {
            typeControl: 'input',
            typeInput: 'password',
            label: 'Confirmar Contraseña',
            name: 'confirmPassword',
            rules: rulesPassword,
            value: deliveryMan.confirmPassword,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, confirmPassword: value }),
            md: 12
          },
          {
            typeControl: 'select',
            loading,
            options: optionsBranchOffices,
            label: 'Sucursal',
            name: 'branchOffice',
            value: deliveryMan.branchOffice,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, branchOffice: value }),
            md: 24
          },
          {
            typeControl: 'input',
            typeInput: 'text',
            label: 'Descripción',
            name: 'description',
            rules: [{ message: 'Favor de escribir una breve descripción del repartidor.' }],
            value: deliveryMan.description,
            onChange: (value: string) => setDeliveryMan({ ...deliveryMan, description: value }),
            md: 24
          }
        ] as CustomInput[]} />
    </>
  )
}

export default CreateUserDeliveryMan;