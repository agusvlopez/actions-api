import { Action } from "@/types/common.ts"

export interface SqlAction extends Action {
  categoryId: string
  image: {
    public_id: string
    url: string
  }
}

export interface SqlActionRow {
  title: string
  description: string
  carbon: number
  category_id: string
  id: string,
  image: {
    public_id: string
    url: string
  }
}