import { IUserRepository } from "@/domain/repos";
import { HttpRequest, HttpResponse, notFound, ok } from "../../helpers";
import { BaseController } from "../BaseController";
import { ValidationBuilder, Validator } from "@/application/validation";

interface httpRequest extends HttpRequest {
    userId: number
}

export class UserDetailController extends BaseController {
    constructor (
        private readonly userRepository: IUserRepository
    ) {
        super()
    }

    async perform(httpRequest: httpRequest): Promise<HttpResponse> {
        const { userId } = httpRequest

        const user = await this.userRepository.getById(userId)
        if (!user) {
            return notFound("User")
        }

        return ok(user)
    }
    
    override buildValidators(httpRequest: httpRequest): Validator[] {
        return [
            ...ValidationBuilder.of({ value: httpRequest.userId, fieldName: 'userId' }).required().number().build()
        ]
    }
} 