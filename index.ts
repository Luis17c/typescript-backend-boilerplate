import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { DbConnection } from '@/infra/typeorm/helpers'

DbConnection.getInstance().connect().then(() => {
    app.listen(env.port, () => {
        console.log(`Server running on http://localhost:${env.port}`)
    })
}).catch((err) => console.log(err))

