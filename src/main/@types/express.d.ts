import { IUser } from "@/domain/models"

declare global {
  declare namespace Express {
    interface Request {
      locals?: {
        user: IUser
      } | any
    }
  }
}