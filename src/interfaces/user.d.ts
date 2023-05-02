import { StringMappingType } from 'typescript';
import { RcFile, UploadFile } from "antd/es/upload";
import { LatLng } from ".";
export interface User {
    uid?: string;
    id?: string;
    role: Rols;
    name: string; 
    email: string;
    phone: string; 
    description: string;
    active: boolean;
    image?: UploadFile<any>[] | string;
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
    branchOffice?: string | BranchOffice;
    userAdmin?: string | UserAdmin;
    latLng?: LatLng;
  }

 