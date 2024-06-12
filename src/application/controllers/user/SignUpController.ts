import { BaseController } from "../BaseController";
import { badRequest, HttpRequest, HttpResponse, ok } from "@/application/helpers";
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { IUserRepository } from '@/domain/repos';
import { ICrypto, IToken } from '@/domain/gateways';

interface SignUpRequest extends HttpRequest {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export class SignUpController extends BaseController {
    constructor (
        private userRepository: IUserRepository,

        private crypto: ICrypto,
        private token: IToken
    ) { super() }

    async perform (httpRequest: SignUpRequest): Promise<HttpResponse> {
        const body = httpRequest

        const userAlreadyExist = await this.userRepository.getByEmail(body.email)
        if (userAlreadyExist) {
            return badRequest(new Error("Email already in use"))
        }
        body.password = await this.crypto.hash(body.password)
        const user = await this.userRepository.create(body);

        const token = this.token.generate({
            userId: user.id
        }, "1d")

        return ok({
            user,
            token
        })
    }

    override buildValidators ({ firstName, lastName, email, password }: SignUpRequest): Validator[] {
        return [
            ...Builder.of({ value: firstName, fieldName: 'firstName' }).required().string().min(4).max(20).build(),
            ...Builder.of({ value: lastName, fieldName: 'lastName' }).required().string().min(4).max(20).build(),
            ...Builder.of({ value: email, fieldName: 'email' }).required().string().min(4).max(20).email().build(),
            ...Builder.of({ value: password, fieldName: 'password' }).required().string().min(4).max(20).build(),
        ]
    }
}