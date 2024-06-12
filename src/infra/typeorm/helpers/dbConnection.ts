import { IDbTransaction } from "@/application/contracts";
import { dataSource } from "@/main/config/database";
import { DataSource, ObjectLiteral, ObjectType, QueryRunner, Repository } from "typeorm";

export class DbConnection implements IDbTransaction {
    private static instance?: DbConnection
    private query?: QueryRunner
    private connection?: DataSource

    private constructor () {}

    static getInstance (): DbConnection {
        if (DbConnection.instance === undefined) DbConnection.instance = new DbConnection()
        return DbConnection.instance
    }

    async connect (): Promise<void> {
        this.connection = dataSource.isInitialized
            ? dataSource
            : await dataSource.initialize()
    }

    async disconnect (): Promise<void> {
        if (this.connection === undefined) return
        await this.connection.destroy()
        this.query = undefined
        this.connection = undefined
    }

    async openTransaction (): Promise<void> {
        if (this.connection == undefined) throw new Error("Connection not found")
        this.query = this.connection.createQueryRunner()
        await this.query.startTransaction()
    }

    async closeTransaction (): Promise<void> {
        if (this.query === undefined) throw new Error("Transaction Not Found")
        await this.query.release()
    }
    
    async commit (): Promise<void> {
        if (this.query === undefined) throw new Error("Transaction Not Found")
        await this.query.commitTransaction()
    }

    async rollback (): Promise<void> {
        if (this.query === undefined) throw new Error("Transaction Not Found")
        await this.query.rollbackTransaction()
    }

    getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
        if (this.connection === undefined) throw new Error("Connection not found")
        if (this.query !== undefined) return this.query.manager.getRepository(entity)
        return this.connection.getRepository(entity)
    }
}