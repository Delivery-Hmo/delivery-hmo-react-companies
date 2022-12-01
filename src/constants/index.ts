import { BranchOffice } from "../interfaces/branchOffice";
<<<<<<< .merge_file_ahtze1
import { UserBranchOfficeSeller } from "../views/userBranchOfficeSeller/createUserBranchOfficeSeller"
=======
import { UserBranchOfficeSeller } from "../views/UserBranchOfficeSeller/CreateUserBranchOfficeSeller"
>>>>>>> .merge_file_hPAnl1

export const initBranch: BranchOffice = {
  userAdmin: "",
  name: "",
  address: "",
  geopoint: "",
  phones: [],
  active: true,
  horario: "",
  logo: "",
  comments: [],
  totolSales: 0,
  salesGoalByMonth: 0,
  email: "",
  website: "",
  facebook: ""
}

export const initUserBranchOfficeSeller: UserBranchOfficeSeller = {
  active: true,
  description: '',
  email: '',
  name: '',
  phone: '',
  role: 'Vendedor',
  password: '',
  confirmPassword: ''
}