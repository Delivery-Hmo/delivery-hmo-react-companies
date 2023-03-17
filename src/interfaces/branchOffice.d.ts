import { UserAdmin } from "./userAdmin";
import { LatLng } from "./";

export interface BranchOffice {
  id?: string;
  userAdmin: string | UserAdmin;
  name: string;
  email: string;
  salesGoalByMonth: number;
  facebook: string; 
  phones: number[];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string; 
  active?: boolean;
  showingInApp?: boolean;
  comments: CommentsBranchOffice[];
  totolSales?: number; 
  password?: string;
  confirmPassword?: string;
}