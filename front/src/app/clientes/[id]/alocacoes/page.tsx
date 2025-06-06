'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Asset {
  id: number
  name: string
  value: number
}

interface ClienteAlocacoes {
  id: number
  nome: string
  email: string
  status: boolean
  assets: Asset[]
}

export default function AlocacoesClientePage() {
  const params = useParams()
  const router = useRouter()
  const clienteId = params?.id

  const { data, isLoading } = useQuery<ClienteAlocacoes>({
    queryKey: ['cliente-alocacoes', clienteId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3333/clientes/${clienteId}/alocacoes`)
      if (!res.ok) throw new Error('Erro ao buscar alocações')
      return res.json()
    },
    enabled: !!clienteId
  })

  if (isLoading || !data) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Alocações de {data.nome} ({data.email})
      </h2>

      {data.assets.length === 0 ? (
        <p>Este cliente não possui ativos alocados.</p>
      ) : (
        <div className="grid gap-4">
          {data.assets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="p-4">
                <p className="font-medium">{asset.name}</p>
                <p className="text-sm text-muted-foreground">
                  Valor: R$ {asset.value.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <Button onClick={() => router.push('/clientes')}>Voltar</Button>
      </div>
    </div>
  )
}