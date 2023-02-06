import { FormRule } from "antd";
import { BranchOffice } from "../interfaces/branchOffice";
import { UserAdmin, UserBranchOfficeDeliveryMan, UserBranchOfficeSeller } from "../interfaces/user";
import { TypeRute } from "../types";

export const googleMapsApiKey = "AIzaSyDAL0TdQNyLykbqiwBQInlazWDwcX9Edns"; //pasar a env
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
  logo: "",
  comments: [],
};
export const initUserBranchOfficeSeller: UserBranchOfficeSeller = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Vendedor',
  password: '',
  confirmPassword: ''
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
  repeatPassword: '',
  role: ''
};
export const rulesPhoneInput: FormRule[]  = [
  { required: true, message: 'Favor de escribir el teléfono.' },
  { min: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' },
  { max: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' }
];
export const initUserBranchOfficeDeliveryMan: UserBranchOfficeDeliveryMan = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Repartidor',
  password: '',
  repeatPassword: '',
  branchOffice: '',
  deliveryMan: true
};
export const title: Record<TypeRute, string> = {
  create: "Registrar",
  update: "Editar"
};
