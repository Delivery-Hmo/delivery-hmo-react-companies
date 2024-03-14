import { ApiNames } from "../types/service";

export interface Post {
  apiName: ApiNames;
  url: string;
  body: Record<string, any>;
  abortController: AbortController;
}
export interface Put extends Post { }

export interface Patch extends Post { }
