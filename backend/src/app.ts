import Fastify from 'fastify'
import clientesRoutes from './routes/clients'
import assetRoutes from './routes/assets'

export const app = Fastify()

app.register(clientesRoutes, { prefix: '/clientes' })
app.register(assetRoutes, { prefix: '/assets' })
