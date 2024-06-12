import { IUser } from "@/domain/models";
import { IUserRepository } from "@/domain/repos";
import { BaseRepository } from "./BaseRepository";
import { User } from "../models";

export class UserRepository extends BaseRepository implements IUserRepository {
    constructor () { super() }
    
    async create (user: Partial<IUser>) {
        const userRepo = this.getRepository(User)
        const savedUser = await userRepo.save(
            userRepo.create(user)
        )
        return await userRepo.findOneByOrFail({ id: savedUser.id })
    }

    async update(id: number, user: Partial<IUser>) {
        const userRepo = this.getRepository(User)
        await userRepo.update(id, user)
        return await userRepo.findOneOrFail({ where: { id } })
    }

    async getById (id: number) {
        const userRepo = this.getRepository(User)
        return await userRepo.findOne({ 
            where: { id } 
        })
    }

    async getByEmail (email: string) {
        const userRepo = this.getRepository(User)
        return await userRepo.findOne({ 
            where: { email }
        })
    }

    async getByEmailWithPassword (email: string) {
        const userRepo = this.getRepository(User)
        return await userRepo.findOne({ 
            where: { email },
            select: ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt']
        })
    }
}