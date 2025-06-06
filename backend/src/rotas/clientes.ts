import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function clientesRoutes(app: FastifyInstance) {
  
  // endpoint que retorna um cliente com seus ativos alocados.
  app.get('/clientes/:id/alocacoes', async (request, reply) => {
    const { id } = request.params as { id: string };
  
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        assets: true, // ou o nome do relacionamento em sua model
      },
    });
  
    if (!cliente) {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
  
    return cliente;
  });

  // Listar clientes
  app.get('/clientes', async () => {
    const clientes = await prisma.cliente.findMany()
    return clientes
  })

  app.get('/clientes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    })
  
    const { id } = paramsSchema.parse(request.params)
  
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    })
  
    if (!cliente) {
      return reply.status(404).send({ message: 'Cliente não encontrado' })
    }
  
    return cliente
  })

  // Criar cliente
  app.post('/clientes', async (request, reply) => {
    const schema = z.object({
      nome: z.string(),
      email: z.string().email(),
      status: z.boolean().optional(),
    })

    const body = schema.parse(request.body)

    const cliente = await prisma.cliente.create({
      data: {
        nome: body.nome,
        email: body.email,
        status: true,
      },
    })

    return reply.status(201).send(cliente)
  })

  // Atualizar cliente
  app.put('/clientes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    })

    const bodySchema = z.object({
      nome: z.string().optional(),
      email: z.string().email().optional(),
      status: z.boolean().optional(),
    })

    const { id } = paramsSchema.parse(request.params)
    const body = bodySchema.parse(request.body)

    const cliente = await prisma.cliente.update({
      where: { id },
      data: body,
    })

    return reply.send(cliente)
  })

    // Deletar cliente
    app.delete('/clientes/:id', async (request, reply) => {
        const paramsSchema = z.object({
          id: z.string().transform(Number),
        })
    
        const { id } = paramsSchema.parse(request.params)
    
        try {
          await prisma.cliente.delete({
            where: { id },
          })
          return reply.status(204).send()
        } catch (error) {
          return reply.status(404).send({ error: 'Cliente não encontrado' })
        }
      })
    
}
