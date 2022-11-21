import moment from "moment";
import { BranchOffice } from "../interfaces/branchOffice";

export const initBranch: BranchOffice = {
  userAdmin: "",
  name: "",
  address: "",
  geopoint: "",
  phones: [0, 0, 0, 0, 0, 0],
  active: true,
  schedule: [[moment(), moment()], [moment(), moment()], [moment(), moment()], [moment(), moment()], [moment(), moment()], [moment(), moment()], [moment(), moment()]],
  logo: "",
  comments: [],
  totolSales: 0,
  salesGoalByMonth: 0,
  email: "",
  website: "",
  facebook: ""
}