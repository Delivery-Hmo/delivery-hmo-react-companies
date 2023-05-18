import { StringMappingType } from 'typescript';
import { RcFile, UploadFile } from "antd/es/upload";
import { LatLng } from ".";
import { Rols } from "../types";

export interface User {
    id?: string;
    uid?: string;
    role: Rols;
    name?: string; 
    email: string;
    phone?: string; 
    description: string;
    active: boolean;
    image?: UploadFile<any>[] | string;
    password?: string;
    confirmPassword?: string;
  }

  export interface UserAdmin extends User {
    company?: string;
    rfc?: string;
  }

  export interface BranchOffice extends User {
    userAdmin: string | UserAdmin;
    salesGoalByMonth: number;
    facebook: string; 
    phones: number[];
    latLng: LatLng;
    center: LatLng;
    radius: number;
    address: string; 
    showingInApp?: boolean;
    comments?: CommentsBranchOffice[];
    totolSales?: number; 
  }

  export interface UserSeller extends User {
    branchOffice?: string | BranchOffice;
    userAdmin?: string | UserAdmin;
  }

  export interface UserDeliveryMan extends User {
    branchOffice?: string | BranchOffice;
    userAdmin?: string | UserAdmin;
    latLng?: LatLng;
  }
  

 