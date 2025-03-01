import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import routes_user from "./routes/user.routes"
import user_auth_router from "./routes/user.auth"
import Routes_Med from "./routes/medicamentos.routes"

const server = express()
server.use(cors())
server.use(express.json())

server.use("/users", routes_user)
server.use("/login", user_auth_router)
server.use("/medicamentos", Routes_Med)

AppDataSource.initialize()
.then(() => server.listen(5431, () => {console.log("Hawk tuah on port 5431!")}))
.catch(() => {console.log("no hawk tuahs")})
