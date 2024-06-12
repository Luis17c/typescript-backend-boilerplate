import { UserDetailController } from "@/application/controllers/user/GetByIdController";
import { makeUserRepository } from "@/main/factories/infra/repos";

export const makeUserDetailController = (): UserDetailController => {
    return new UserDetailController(makeUserRepository())
}