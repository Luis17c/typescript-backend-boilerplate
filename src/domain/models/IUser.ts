import { IBaseModel } from "./IBaseModel"

export interface IUser extends IBaseModel {
    photo: string
    
    firstName: string
    lastName: string

    email: string
    password: string
}