import { Action } from "@/types/common.ts"

export interface MongoAction extends Action {
  category: string
}