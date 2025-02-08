import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Medicamento } from "./entity/Medicamento"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_databank,
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
