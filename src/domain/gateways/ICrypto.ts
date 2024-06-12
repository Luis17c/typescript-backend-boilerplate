export interface ICrypto {
    hash (toHash: string): Promise<string>
    compare (toCompare: string, hashData: string): Promise<boolean>
}