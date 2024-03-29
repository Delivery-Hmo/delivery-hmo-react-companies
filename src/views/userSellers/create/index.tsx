import { useEffect, useMemo, useState } from 'react';
import DynamicForm from '../../../components/dynamicForm';
import { Card, Form, FormRule, Grid, message, UploadFile } from 'antd';
import { get, post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { initUserSeller, titleForm } from '../../../constants';
import { BranchOffice, UserSeller } from '../../../interfaces/user';
import { TypeRute } from '../../../types';
import HeaderView from "../../../components/headerView";
import { Option } from "../../../interfaces";
import useGet, { PropsUseGet } from "../../../hooks/useGet";
import { setImagesToState } from "../../../utils/functions";
import useAbortController from "../../../hooks/useAbortController";

const { useBreakpoint } = Grid;

const CreateUserSeller = () => {
  const abortController = useAbortController();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const propsUseGet = useMemo<PropsUseGet>(() => ({ url: "branchOffice/listByUserAdmin" }), []);
  const { loading: loadingBranchOffices, response: branchOffices } = useGet<BranchOffice[]>(propsUseGet);
  const screens = useBreakpoint();
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [seller, setSeller] = useState<UserSeller>(initUserSeller);

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !seller.id && seller.password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }
  ], [seller]);

  const isValidRFC = (value: string) => {
    const regex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    let isValid = regex.test(value);

    if (!isValid) {
      message.error('El RFC no es válido.');
      return false;
    }

    return regex.test(value);
  }

  useEffect(() => {
    let _userSeller = { ...state } as UserSeller | null;

    setType(_userSeller?.id ? "update" : "create");

    if (!_userSeller?.id) return;

    _userSeller = setImagesToState(_userSeller);
    form.setFieldsValue(_userSeller);
    setSeller(_userSeller);
  }, [state, form]);

  const optionsBranchOffices = useMemo<Option[]>(() => {
    const _branchOfficesOptions = (branchOffices?.map(b => ({ text: b.name, value: b.id })) || []) as Option[];
    _branchOfficesOptions.unshift({ text: "Sin sucursal", value: "" });
    return _branchOfficesOptions;
  }, [branchOffices]);

  const onFinish = async () => {
    if (saving) return;

    const _seller = { ...seller };
    const { password, confirmPassword } = _seller;

    if (password && confirmPassword !== password) {
      message.error('Las contraseñas no coinciden.');
      return;
    }

    setSaving(true);

    delete _seller.confirmPassword;

    try {
      if (type === "update") {
        await put(`userSeller/${type}`, _seller, abortController.current as AbortController);
      } else {
        await post(`userSeller/${type}`, _seller, abortController.current as AbortController);
      }

      message.success('Vendedor guardado con éxito.', 4);
      navigate('/vendedores');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <HeaderView
        title={titleForm[type]}
        path="/vendedores"
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
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: seller.name,
              onChange: (value: string) => setSeller({ ...seller, name: value }),
              md: 12
            },
            {
              typeControl: 'input',
              typeInput: 'rfc',
              label: 'RFC',
              name: 'rfc',
              value: seller.rfc,
              onChange: (value: string) => setSeller({ ...seller, rfc: value }),
              md: 12
            },
            {
              typeControl: 'phone',
              label: 'Teléfono',
              name: 'phone',
              value: seller.phone,
              onChange: (value: string) => setSeller({ ...seller, phone: value }),
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
              md: 12
            },
            {
              typeControl: 'input',
              typeInput: 'password',
              label: 'Confirmar contraseña',
              name: 'confirmPassword',
              rules: rulesPassword,
              value: seller.confirmPassword,
              onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
              md: 12
            },
            {
              typeControl: 'select',
              loading: loadingBranchOffices,
              options: optionsBranchOffices,
              label: 'Sucursal',
              name: 'branchOffice',
              value: seller.branchOffice,
              onChange: (value: string) => setSeller({ ...seller, branchOffice: value }),
              md: 24
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
              label: screens.xs ? "" : "Foto vendedor",
              name: "image",
              value: seller.image,
              maxCount: 1,
              accept: "image/png, image/jpeg",
              onChange: (value: UploadFile<any>[]) => setSeller({ ...seller, image: value }),
              md: 8,
              styleFI: { display: "flex", justifyContent: "center" },
              multiple: false,
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default CreateUserSeller;