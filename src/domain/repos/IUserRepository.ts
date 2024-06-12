import { IUser } from "../models";

interface IUserWithoutPassword extends Omit<IUser, 'password'> {

}

export interface IUserRepository {
    create (user: Partial<IUser>): Promise<IUserWithoutPassword>
    update (id: number, user: Partial<IUser>): Promise<IUserWithoutPassword>
    getById (id: number): Promise<IUserWithoutPassword | null>
    getByEmail (email: string): Promise<IUserWithoutPassword | null> 
    getByEmailWithPassword (email: string): Promise<IUser | null>
}