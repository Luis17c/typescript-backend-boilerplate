import { IDbTransaction } from '@/application/contracts'
import { BaseController } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

export class DbTransactionController extends BaseController {
  constructor (
    private readonly decoratee: BaseController,
    private readonly db: IDbTransaction
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decoratee.perform(httpRequest)
      await this.db.commit()
      return httpResponse
    } catch (error) {
      await this.db.rollback()
      throw error
    } finally {
      await this.db.closeTransaction()
    }
  }
}