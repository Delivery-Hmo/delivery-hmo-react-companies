import { User } from "./user";
import { BranchOffice } from "./branchOffice";

export interface CommentsBranchOffice {
  id?: string;
  comment: string;
  user: string | User;
  date: Date;
  branchOffice: string | BranchOffice;
}