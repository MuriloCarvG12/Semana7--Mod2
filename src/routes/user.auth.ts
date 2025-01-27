import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const user_auth_router = Router()

const user_repository = AppDataSource.getRepository(User)

user_auth_router.post('/', async (req: Request, res: Response) => { 
    try {
    const req_body = req.body

        const user = await user_repository.findOne({
            where:{email: req_body.email}
        })

        if(!user)
            {
                res.status(404).json("senha ou email incorretos!")
            }
        
        const is_valid = await bcrypt.compare(req_body.senha, user.senha)

        if(is_valid)
            {
                res.status(200).json("seja bem vindo")
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