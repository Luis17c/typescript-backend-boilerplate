import { BaseController } from "@/application/controllers";
import { DbTransactionController } from "@/application/decorators";
import { DbConnection } from "@/infra/typeorm/helpers";

export const makeDbTransactionController = (controller: BaseController): DbTransactionController => new DbTransactionController(controller, DbConnection.getInstance())