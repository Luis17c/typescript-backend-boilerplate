import { SaveProfilePhotoController } from "@/application/controllers/user";
import { makeUserRepository } from "@/main/factories/infra/repos";

export const makeSaveProfilePhotoController = (): SaveProfilePhotoController => new SaveProfilePhotoController(makeUserRepository())