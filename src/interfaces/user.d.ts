import { UploadFile } from "antd/es/upload";
import { LatLng } from ".";
import { Rols } from "../types";
import { CommentsBranchOffice } from "./branchOffice/commentBranchOffice";
import { ProductBranchOffice } from "./branchOffice/productBranchOffice";

export interface User {
  readonly id?: string;
  readonly uid?: string;
  readonly role: Rols;
  name?: string;
  email: string;
  description: string;
  readonly active: boolean;
  image?: UploadFile<any>[] | string;
  password?: string;
  confirmPassword?: string;
}

export interface UserAdmin extends User {
  phone?: string;
  rfc?: string;
}

export interface BranchOffice extends User {
  readonly userAdmin: string | UserAdmin;
  salesGoalByMonth: number;
  facebook: string;
  phones: number[];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string;
  comments?: CommentsBranchOffice[];
  totolSales?: number;
  readonly showInApp: boolean;
  readonly validatedImages: boolean;
  readonly validatingImages: boolean;
  products: ProductBranchOffice[];

  //solo front
  changingShowInApp?: boolean;
  images: UploadFile<any>[] | string[];
}

export interface UserSeller extends User {
  phone?: string;
  readonly branchOffice?: string | BranchOffice;
  readonly userAdmin?: string | UserAdmin;
  rfc: string;
}

export interface UserDeliveryMan extends User {
  phone?: string;
  readonly branchOffice?: string | BranchOffice;
  readonly userAdmin?: string | UserAdmin;
  latLng?: LatLng;
}


