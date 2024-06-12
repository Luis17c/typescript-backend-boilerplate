import { UserRepository } from "@/infra/typeorm/repos";

export const makeUserRepository = (): UserRepository => {
    return new UserRepository()
}