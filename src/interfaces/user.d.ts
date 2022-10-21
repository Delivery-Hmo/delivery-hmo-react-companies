import {Rols} from '../types/roles'
export interface User {
    uid?: string;
    id?: string;
    name: string;
    email: string;
    phone: string; 
    description: string;
    active: boolean;
    image: string;
    role: Rols;
  }
  
  export interface UserAdmin extends User {
    company: string;
  }