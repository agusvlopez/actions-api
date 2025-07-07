import { Action } from "./common.ts";

export interface MongoAction extends Action {
  category: string
}