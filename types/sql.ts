import { Action } from "./action.common.ts";

export interface SqlAction extends Action {
  categoryId: string
}