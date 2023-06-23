import { StringMappingType } from 'typescript';
import { RcFile, UploadFile } from "antd/es/upload";
import { LatLng } from ".";
import { Rols } from "../types";

export interface User {
  readonly id?: string;
  uid?: string;
  readonly role?: Rols;
  name?: string;
  email: string;
  description: string;
  active: boolean;
  image?: UploadFile<any>[] | string;
  password?: string;
  confirmPassword?: string;
}

export interface UserAdmin extends User {
  phone?: string;
  rfc?: string;
}

export interface BranchOffice extends User {
  userAdmin: string | UserAdmin;
  salesGoalByMonth: number;
  facebook: string;
  phones: readonly number[];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string;
  showingInApp?: boolean;
  comments?: CommentsBranchOffice[];
  totolSales?: number;
}

export interface UserSeller extends User {
  phone?: string;
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  rfc: string;
}

export interface UserDeliveryMan extends User {
  phone?: string;
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  latLng?: LatLng;
}


