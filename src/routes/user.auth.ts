import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken"
import payload from '../types/payload';


const user_auth_router = Router()

const user_repository = AppDataSource.getRepository(User)

user_auth_router.post('/', async (req: Request, res: Response) => { 
    try {
    const userlogin = req.body as payload

        const user = await user_repository.findOne({
            where:{email: userlogin.email}
        })

        if(!user)
            {
                res.status(404).json("senha ou email incorretos!")
                
            }
            
         

        const is_valid = await bcrypt.compare(userlogin.password, user.senha)

        if(is_valid)
            {
                const jwt_key = process.env.jwt_key
                console.log("bear " + jwt_key)
                const payload = 
                {
                    email: user.email,
                    name: user.name,
                    userId: user.id,
                }
                const token = await jwt.sign(payload, jwt_key, {expiresIn: '1h'})
                res.status(200).json(token)
            }
        else
            {
             res.status(404).json("senha ou email incorretos!")
            }

    } 
    catch (error) {
        res.status(500).send("Ocorreu um erro ao executar a solicitação" + error)
    }
})

export default user_auth_router