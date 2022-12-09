import { UserAdmin } from "./userAdmin";
import { LatLng } from "./";

export interface BranchOffice {
  id?: string; //
  userAdmin: string | UserAdmin; //
  name: string; //
  address: string; 
  latLang: LatLng;
  radius: number;
  phones: number[]; //
  active: boolean; //
  showingInApp: boolean;//
  logo: string;
  comments: CommentsBranchOffice[]; //
  totolSales: number; // 
  salesGoalByMonth: number; //
  email?: string; //
  website?: string; //
  facebook?: string; //
  //faltarian las props para el radio de busqueda de repartidores y para mostar a clientes
}