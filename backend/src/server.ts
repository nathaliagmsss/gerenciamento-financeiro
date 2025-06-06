import Fastify from 'fastify'
import { clientesRoutes } from './rotas/clientes'
import { assetsRoutes } from './rotas/assets'
import cors from '@fastify/cors'

const app = Fastify()

// Registra o plugin cors com a configuração para liberar o frontend
app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(clientesRoutes)
app.register(assetsRoutes)


app.get('/ping', async () => {
  return { message: 'pong' }
})

app.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log('🚀 Backend rodando na porta 3333')
})
