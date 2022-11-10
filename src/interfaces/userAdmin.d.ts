export interface User {
  id?: string;
  uid: string;
  name: string;
  email: string;
  phone: string; 
  description: string;
  active: boolean;
  image?: string;
  role: Roles;
  password: string;
  repeatPassword: string;
}

export interface UserAdmin extends User {
  company: string;
}
