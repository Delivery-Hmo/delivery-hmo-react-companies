import dayjs from "dayjs";

export type Roles = "" | "Administrador" | "Vendedor" | "Repartidor";
export type OptionsValue = string | number | Boolean | dayjs.Dayjs | null | undefined;
export type TypesInputs = 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file' | 'timeRangePicker' | 'phone'
export type LibrariesGoogleMaps = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type TypeRute = "create" | "update";
