import { UserAdmin } from "./userAdmin";

export interface BranchOffice {
  id?: string; //
  userAdmin: string | UserAdmin; //
  name: string; //
  address: string; 
  geopoint: string;
  phones: number[]; //
  active: boolean; //
  schedule: moment.Moment[][];
  logo: string;
  comments: CommentsBranchOffice[]; //
  totolSales: number; // 
  salesGoalByMonth: number; //
  email?: string; //
  website?: string; //
  facebook?: string; //
  //faltarian las props para el radio de busqueda de repartidores y para mostar a clientes
}