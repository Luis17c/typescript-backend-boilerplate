export interface IDbTransaction {
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    openTransaction: () => Promise<void>
    closeTransaction: () => Promise<void>
    commit: () => Promise<void>
    rollback: () => Promise<void>
}