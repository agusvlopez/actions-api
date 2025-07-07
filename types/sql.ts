import { Action } from "./common.ts";

export interface SqlAction extends Action {
  categoryId: string
}