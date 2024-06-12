export type IPayload = {
    userId: number
}

export interface IToken {
    generate (payload: IPayload, expiresIn: string): string
    validate (token: string): IPayload | undefined
}