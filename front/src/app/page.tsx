'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-bold">Sistema de Gestão Financeira</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        {/* Link para Clientes */}
        <Link href="/clientes" className="block">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-6 text-center space-y-2">
              <h3 className="text-2xl font-semibold">Clientes</h3>
              <p className="text-muted-foreground">Gerencie os clientes do sistema</p>
            </CardContent>
          </Card>
        </Link>

        {/* Link para Ativos */}
        <Link href="/ativos" className="block">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-6 text-center space-y-2">
              <h3 className="text-2xl font-semibold">Ativos Fixos</h3>
              <p className="text-muted-foreground">Visualize os ativos disponíveis</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}