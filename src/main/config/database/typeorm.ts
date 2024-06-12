import 'reflect-metadata'
import { DataSource } from "typeorm";
import 'dotenv/config'
import { env } from "../env";

export const dataSource = new DataSource({
  type: "postgres",
  port: +env.dbPort,
  host: env.dbHost,
  database: env.dbDatabase,
  username: env.dbUser,
  password: env.dbPassword,
  synchronize: true,
  logging: true,
  entities: [
    `${env.ambient === "dev" ? "src/" : "src/"}infra/typeorm/models/*.{ts, js}`,
  ],
  migrations: [
    `${
      env.ambient === "dev" ? "src" : "dist"
    }/config/migrations/*.{ts,js}`
  ]
})
