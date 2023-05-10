import { FormRule } from "antd";
import { BranchOffice, UserAdmin, UserDeliveryMan, UserSeller } from "../interfaces/user";
import { TypeRute } from "../types";

export const urlImageDefaultProfile = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2Fperfil.jpg?alt=media&token=a07f8154-7aaa-4397-a8cf-4aeaee5b0f5e";
export const googleMapsApiKey = "AIzaSyAJZcZP0yqFEeD3roIhSRrwDyLlpUkWKb4";
export const initBranch: BranchOffice = {
  userAdmin: "",
  name: "",
  email: "",
  salesGoalByMonth: 0,
  facebook: "",
  phones: [0, 0, 0],
  latLng: {
    lat: 0,
    lng: 0
  },
  radius: 0,
  center: {
    lat: 0,
    lng: 0
  },
  address: "",
  role: "Administrador sucursal",
  active: true,
  description: ""
};
export const initUserSeller: UserSeller = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Vendedor'
} as const;
export const initUserAdmin: UserAdmin = {
  id: '',
  uid: '',
  active: true,
  company: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: ''
} as const;
export const initUserDeliveryMan: UserDeliveryMan = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Repartidor',
  password: '',
  confirmPassword: '',
} as const;
export const rulePhoneInput: FormRule = {
  required: true,
  message: 'El número telefónico tiene que ser de 10 dígitos.',
  validator: (rule, value?: string ) => value?.length !== 10 ? Promise.reject(rule.message) : Promise.resolve(),
} as const;
export const ruleMaxLength: FormRule = {
  max: 300,
  message: "El texto no puede tener más de 300 caracteres."
} as const;
export const ruleEmail: FormRule = {
  required: true,
  message: 'Favor de escribir el Correo electrónico válido.',
  type: "email"
} as const;
export const rulePassword: FormRule = {
  required: true,
  min: 6,
  message: 'La contraseña tiene que ser de 6 dígitos o más.'
} as const;
export const titleForm: Record<TypeRute, string> = {
  create: "Registrar",
  update: "Editar"
} as const;
