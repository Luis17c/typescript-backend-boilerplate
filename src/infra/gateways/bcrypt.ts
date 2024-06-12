import { ICrypto } from "@/domain/gateways";
import { hash, compare } from 'bcrypt'

export class Crypto implements ICrypto {
    async hash(toHash: string): Promise<string> {
        return await hash(toHash, 256)
    }

    async compare(toCompare: string, hashData: string): Promise<boolean> {
        return await compare(toCompare, hashData)
    }
}