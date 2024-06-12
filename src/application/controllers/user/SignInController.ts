import { BaseController } from "../BaseController";
import { HttpRequest, HttpResponse, notFound, ok, unauthorized } from "@/application/helpers";
import { ICrypto, IToken } from '@/domain/gateways';
import { IUserRepository } from '@/domain/repos';
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { env } from "@/main/config/env";

interface SignInRequest extends HttpRequest {
    email: string,
    password: string
}

export class SignInController extends BaseController {
    constructor (
        private userRepository: IUserRepository,

        private crypto: ICrypto,
        private token: IToken
    ) { super() }

    async perform(httpRequest: SignInRequest): Promise<HttpResponse> {
        const body = httpRequest

        let user = await this.userRepository.getByEmailWithPassword(body.email)
        if (!user) {
            return unauthorized()
        }
        if (!this.crypto.compare(body.password, user.password)) {
            return unauthorized()
        }
        const token = this.token.generate({
            userId: user.id
        }, env.jwtExpiresIn)

        const returnUser = await this.userRepository.getById(user.id)

        return ok({
            user: returnUser,
            token
        })
    }

    override buildValidators ({ email, password }: SignInRequest): Validator[] {
        return [
            ...Builder.of({ value: email, fieldName: 'email' }).required().string().email().build(),
            ...Builder.of({ value: password, fieldName: 'password' }).required().string().build()
        ]
    }
}