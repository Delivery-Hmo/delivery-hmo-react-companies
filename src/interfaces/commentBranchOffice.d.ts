import { User } from "./user";
import { BranchOffice } from "./user";

export interface CommentsBranchOffice {
  id?: string;
  comment: string;
  user: string | User;
  date: Date;
  branchOffice: string | BranchOffice;
}