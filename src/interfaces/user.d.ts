import { StringMappingType } from 'typescript';
import { Rols } from '../types/roles'
import { RcFile, UploadFile } from "antd/es/upload";
export interface User {
    uid?: string;
    id?: string;
    name: string;
    email: string;
    phone: string; 
    description: string;
    active: boolean;
    image?: UploadFile<any>[];
    role: Rols;
    password?: string;
    confirmPassword?: string;
  }

  export interface UserSeller extends User {
    branchOffice?: string;
    password?: string;
  }
  
  export interface UserAdmin extends User {
    company: string;
  }

  export interface UserDeliveryMan extends User {
    branchOffice: string | BranchOffice;
    deliveryMan: boolean;
    deliveryManProps?: {
      location: number | null;
    }
  }