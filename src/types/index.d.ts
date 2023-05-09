import dayjs from "dayjs";

export type Rols = "" | "Administrador" | "Administrador sucursal" | "Vendedor" | "Repartidor";
export type OptionsValue = string | number | Boolean | dayjs.Dayjs | null | undefined;
export type TypeControl = 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file' | 'timeRangePicker' | 'phone'
export type TypeInput = 'text' | 'number' | 'password' | 'email';
export type LibrariesGoogleMaps = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type TypeRute = "create" | "update";
