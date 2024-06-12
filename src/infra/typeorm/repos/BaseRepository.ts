import { ObjectLiteral, ObjectType, Repository } from "typeorm";
import { DbConnection } from "../helpers";

export abstract class BaseRepository {
    constructor (
        private readonly connection: DbConnection = DbConnection.getInstance()
    ) {}

    getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
        return this.connection.getRepository(entity)
    } 
}