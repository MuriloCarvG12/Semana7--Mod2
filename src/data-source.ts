import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Medicamento } from "./entity/Medicamento"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "semana7",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
