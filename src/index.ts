import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())


AppDataSource.initialize()
.then(() => server.listen(5432, () => {console.log("Hawk tuah on port 5432!")}))
.catch(() => {console.log("no hawk tuahs")})
