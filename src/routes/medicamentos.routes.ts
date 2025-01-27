import {Request, Response, Router} from "express"
import {AppDataSource} from "../data-source"
import { Medicamento } from "../entity/Medicamento"


const Routes_Med = Router()

const medicamentoRepository = AppDataSource.getRepository(Medicamento)

Routes_Med.get('/all', async (req: Request, res: Response) => {
    try 
    {
        const medicamentos = medicamentoRepository.find()
        if(Object.keys(medicamentos).length === 0)
            {
                res.status(201).json('Não há medicamentos cadastrados!')
            }
        else
        {
            res.status(201).json(medicamentos)
        }
        
    } 

    catch (error) 
    {
        res.status(500).json('não foi possivel encontrar o servidor')
    }

Routes_Med.get('/med/:id', async (req: Request, res:Response) =>  
{
    try 
    {
        const body_id = req.params.id
        const medicamento_procurado = medicamentoRepository.findOneBy({id: parseInt(body_id)}) 

        if(Object.keys(medicamento_procurado).length === 0)
            {
                res.status(201).json("o medicamento que voce procura não esta cadastrado")
            }
        else
        {
            res.status(201).json(medicamento_procurado)
        }
    } 

    catch (error) 
    {
        res.status(500).json('não foi possivel encontrar o servidor')
    }
})



})


export default Routes_Med