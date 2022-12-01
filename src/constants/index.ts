import { BranchOffice } from "../interfaces/branchOffice";

export const googleMapsApiKey = "AIzaSyDAL0TdQNyLykbqiwBQInlazWDwcX9Edns";
export const initBranch: BranchOffice = {
  userAdmin: "",
  name: "",
  address: "",
  latLang: {
    lat: 0,
    lng: 0
  },
  phones: [0, 0, 0, 0, 0, 0],
  active: true,
  showingInApp: false,
  logo: "",
  comments: [],
  totolSales: 0,
  salesGoalByMonth: 0,
  email: "",
  website: "",
  facebook: "",
  radius: 0,
};

export const namesDaysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];