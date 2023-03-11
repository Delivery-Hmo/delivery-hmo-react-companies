import { FormRule } from "antd";
import { BranchOffice } from "../interfaces/branchOffice";
import { UserAdmin, UserBranchOfficeDeliveryMan, UserBranchOfficeSeller } from "../interfaces/user";
import { TypeRute } from "../types";

export const googleMapsApiKey = "AIzaSyDAL0TdQNyLykbqiwBQInlazWDwcX9Edns"; //pasar a una api
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
  comments: [],
};
export const initUserBranchOfficeSeller: UserBranchOfficeSeller = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Vendedor',
};
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
};
export const rulesPhoneInput: FormRule[]  = [
  { required: true, message: 'Favor de escribir el teléfono.' },
  { min: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' },
  { max: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' }
];
export const ruleMaxLength: FormRule = {
  max: 300,
  message: "El texto no puede tener más de 300 caracteres."
};
export const ruleEmail: FormRule = { 
  required: true, 
  message: 'Favor de escribir el Correo electrónico válido.', 
  type: "email" 
};
export const rulePassword: FormRule = {
  required: true, 
  min: 6, 
  message: 'La contraseña tiene que ser de 6 dígitos o màs.' 
};

export const initUserBranchOfficeDeliveryMan: UserBranchOfficeDeliveryMan = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Repartidor',
  password: '',
  confirmPassword: '',
  branchOffice: '',
  deliveryMan: true
};
export const title: Record<TypeRute, string> = {
  create: "Registrar",
  update: "Editar"
};
