import { Roles } from "../types";

export interface User {
  id?: string;
  uid: string;
  name: string;
  email: string;
  phone: string; 
  description: string;
  active: boolean;
  image?: string;
  role: Roles;
}

export interface UserAdmin extends User {
  company: string;
}
