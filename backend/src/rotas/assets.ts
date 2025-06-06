import { PrismaClient } from '@prisma/client';
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify';


const prisma = new PrismaClient();

export async function assetsRoutes(app: FastifyInstance) {
    
    // Lista fixa de ativos com valores estáticos
    app.get('/ativos-fixos', async (request: FastifyRequest, reply: FastifyReply) => {
        const ativos = [
          { name: "NASD11", value: 15.30 },
          { name: "V8 SPEEDWAY", value: 1.00 },
          { name: "BTG CDB Plus FIRF CrPr", value: 3.098 },
        ];
        return ativos;
      });

    
    // Listar assets
    app.get('/assets', async () => {
        try {
            const assets = await prisma.asset.findMany();
            return assets;
          } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Internal Server Error' });
          }
    })
  
    // Criar asset
    app.post('/assets', async (request: FastifyRequest, reply: FastifyReply) => {
      const schema = z.object({
        name: z.string(),
        value: z.number(),
        clientId: z.number(),
      })
  
      const data = schema.parse(request.body)
  
      const asset = await prisma.asset.create({ data })
      return reply.status(201).send(asset)
    })
  
    // Atualizar asset
    app.put('/assets/:id', async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      })
  
      const bodySchema = z.object({
        name: z.string().optional(),
        value: z.number().optional(),
        clientId: z.number().optional(),
      })
  
      const { id } = paramsSchema.parse(request.params)
      const data = bodySchema.parse(request.body)
  
      const asset = await prisma.asset.update({
        where: { id },
        data,
      })
  
      return reply.send(asset)
    })
  
    // Deletar asset
    app.delete('/assets/:id', async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      })
  
      const { id } = paramsSchema.parse(request.params)
  
      try {
        await prisma.asset.delete({ where: { id } })
        return reply.status(204).send()
      } catch (error) {
        return reply.status(404).send({ error: 'Asset não encontrado' })
      }
    })
  }  
