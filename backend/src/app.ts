import Fastify from 'fastify'
import {clientesRoutes} from './rotas/clientes'
import {assetsRoutes} from './rotas/assets'

export const app = Fastify()

app.register(clientesRoutes, { prefix: '/clientes' })
app.register(assetsRoutes, { prefix: '/assets' })