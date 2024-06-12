import { IPayload, IToken } from "@/domain/gateways";
import { env } from "@/main/config/env";
import * as jwt from 'jsonwebtoken'

export class Token implements IToken {
    generate(payload: IPayload, expiresIn: string): string {
        return jwt.sign(payload, env.jwtSecret, { expiresIn })
    }
    validate(token: string): IPayload | undefined {
        try {
            const payload = jwt.verify(token, env.jwtSecret) as IPayload
            return payload
        } catch (err: any) {
            return undefined
        }
    }
}