import {Request, Response, Router} from "express"
import {AppDataSource} from "../data-source"
import { Medicamento } from "../entity/Medicamento"


const Routes_Med = Router()

const medicamentoRepository = AppDataSource.getRepository(Medicamento)

Routes_Med.get('/all', async (req: Request, res: Response) => {
    try 
    {
        const medicamentos = await medicamentoRepository.find()
        if(Object.keys(medicamentos).length === 0)
            {
                res.status(404).json('Não há medicamentos cadastrados!')
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

Routes_Med.get('/medicamento/:med_id', async (req: Request, res:Response) =>  
{
    try 
    {
        const body_id = req.params.med_id
        const medicamento_procurado = await medicamentoRepository.findOneBy({id: Number(body_id)}) 

        if(Object.keys(medicamento_procurado).length === 0)
            {
                res.status(404).json("o medicamento que voce procura não esta cadastrado")
            }
        else
        {
            res.status(201).json(medicamento_procurado)
        }
    } 

    catch (error) 
    {
        console.log(error)
        res.status(500).json("não foi possivel encontrar o servidor")
    }
})

Routes_Med.post('/cadastrarMedicamento', async (req:Request, res:Response) => 
    {
        try 
        {
            const medBody = req.body as Medicamento

            if(!medBody || !medBody.description || !medBody.name || !medBody.user_id)
                {
                    res.status(400).json("Todos os campos precisam ser preenchidos!")
                }
            
            await medicamentoRepository.save(medBody)
            res.status(201).json(medBody)
        } 



        catch (error) 
        {
            res.status(500).json('não foi possivel encontrar o servidor')
        }
        

        
    })

Routes_Med.put('/atualizarProduto/:id', async (req:Request, res :Response) => {
    try
    {
        const body_id = req.params.id;
        const medBody = req.body as Medicamento

        const produto_desatualizado = await medicamentoRepository.findOneBy({id: Number(body_id)})

        if(!produto_desatualizado)
            {
                res.status(404).json("não foi possivel encontrar o medicamento especificado")
            }

        Object.assign(produto_desatualizado, medBody)

        await medicamentoRepository.save(produto_desatualizado)
    
        res.status(200).json(produto_desatualizado)
           

    } 

    catch (error) 
    {
        res.status(500).json('não foi possivel encontrar o servidor')
    }
})

Routes_Med.delete('/removerMedicamento/:id', async (req: Request, res:Response) => 
{
    try 
    {
        const body_id = req.params.id

        const produto_deletado = await medicamentoRepository.delete({id: Number(body_id)})

        res.status(202).json('produto deletado com sucesso!')
    } 

    catch (error) 
    {
        res.status(500).json('não foi possivel encontrar o servidor')
    }
})



})


export default Routes_Med