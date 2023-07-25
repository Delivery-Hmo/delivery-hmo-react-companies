import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { UserAdmin, UserDeliveryMan, UserSeller, BranchOffice } from "../interfaces/user";

export type Users = UserAdmin | BranchOffice | UserSeller | UserDeliveryMan;
export type Rols = "" | "Administrador" | "Administrador sucursal" | "Vendedor" | "Repartidor";
export type OptionsValue = string | number | Boolean | dayjs.Dayjs | null | undefined;
export type TypeControl = 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file' | 'timeRangePicker' | 'phone';
export type TypeInput = 'text' | 'number' | 'password' | 'email';
export type LibrariesGoogleMaps = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type TypeRute = "create" | "update";
export type DS<T> = Dispatch<SetStateAction<T>>;
