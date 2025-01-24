import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User)
const routes_user = Router()

routes_user.post("/cadastrarUsuario", async (req:Request, res:Response) => {
        try {
        const new_user = userRepository.create(
            {
                name: req.body.name,
                email: req.body.email,
                senha: req.body.senha
            })

            
                return res.status(201).json(new_user)
            } 

        catch (error) 
            {
                return res.status(404).json({message:"No hawk tuah"})
            }
    })