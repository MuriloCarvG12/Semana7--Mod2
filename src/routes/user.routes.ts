import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User)
const routes_user = Router()

routes_user.post("/cadastrar", async (req: Request, res: Response) => {
    try {
        console.log('Password received:', req.body.senha);
        const saltRounds = 10; // Determines the cost factor
        const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);

        const new_user = userRepository.create(
            {
                name: req.body.name,
                email: req.body.email,
                senha: hashedPassword
            })

                await userRepository.save(new_user)
                res.status(201).json(new_user)
            } 

        catch (error) 
            {
                res.status(500).send("Ocorreu um erro ao executar a solicitação" + error)
            }
})
export default routes_user;

