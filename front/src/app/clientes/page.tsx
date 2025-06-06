"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const ClienteSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
});

type Cliente = {
  id: number;
  nome: string;
  email: string;
  status: boolean;
};

type FormData = z.infer<typeof ClienteSchema>;

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(ClienteSchema) });

  const { isLoading, refetch } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3333/clientes");
      const data = await res.json();
      setClientes(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (clienteEditando) {
        await fetch(`http://localhost:3333/clientes/${clienteEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, status: true }),
        });
      } else {
        await fetch("http://localhost:3333/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, status: true }),
        });
      }

      setClienteEditando(null);
      await refetch();
      reset({"nome": "", email: ""});
    } catch (error) {
      alert("Erro ao salvar cliente");
      console.error(error);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteEditando(cliente);
    reset({ nome: cliente.nome, email: cliente.email });
  };

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return;
  
    try {
      await fetch(`http://localhost:3333/clientes/${id}`, {
        method: 'DELETE',
      });
      await refetch();
    } catch (error) {
      alert('Erro ao deletar cliente');
      console.error(error);
    }
  }
  

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-semibold">Clientes</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-md shadow-md"
      >
        <Input placeholder="Nome" {...register("nome")} />
        {errors.nome && (
          <p className="text-sm text-red-600">{errors.nome.message}</p>
        )}

        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <Button type="submit" className="w-full">
          {clienteEditando ? "Salvar alterações" : "Cadastrar"}
        </Button>
      </form>

      <section className="bg-white rounded-md shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">Lista de Clientes</h3>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <li
                key={cliente.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium">{cliente.nome}</p>
                  <p className="text-sm text-muted-foreground">{cliente.email}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar cadastro
                  </button>
                  <Link
                    href={`/clientes/${cliente.id}/alocacoes`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver alocações
                  </Link>

                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-600 hover:underline"
                  >
                    Deletar
                  </button>

                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}


// "use client";
// import { useQuery } from '@tanstack/react-query'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useState } from 'react'
// import Link from 'next/link'


// const ClienteSchema = z.object({
//   nome: z.string().min(1, 'Nome obrigatório'),
//   email: z.string().email('Email inválido'),
// })

// type Cliente = {
//   id: number
//   nome: string
//   email: string
//   status: boolean
// }

// type FormData = z.infer<typeof ClienteSchema>

// export default function ClientesPage() {
//   const [clientes, setClientes] = useState<Cliente[]>([])

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm<FormData>({ resolver: zodResolver(ClienteSchema) })

//   const { isLoading, refetch } = useQuery({
//     queryKey: ['clientes'],
//     queryFn: async () => {
//       const res = await fetch('http://localhost:3333/clientes')
//       const data = await res.json()
//       setClientes(data)
//       return data
//     },
//     refetchOnWindowFocus: false
//   })

//   const [clienteParaAtivo, setClienteParaAtivo] = useState<number | null>(null)

//   function abrirFormularioAtivo(clienteId: number) {
//     setClienteParaAtivo(clienteId)
//   }

//   function fecharFormularioAtivo() {
//     setClienteParaAtivo(null)
//   }

//   const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null)

//   const onSubmit = async (data: FormData) => {
//     try {
//       if (clienteEditando) {
//         await fetch(`http://localhost:3333/clientes/${clienteEditando.id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             ...data,
//             status: true, // ou clienteEditando.status, se quiser manter
//           }),
//         })
//       } else {
//         await fetch('http://localhost:3333/clientes', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             ...data,
//             status: true,
//           }),
//         })
//       }
      
//       setClienteEditando(null)
//       await refetch()
//       reset({ nome: '', email: '' })
//     } catch (error) {
//       alert('Erro ao salvar cliente')
//       console.error(error)
//     }
//   }
  
//   // const onSubmit = async (data: FormData) => {
//   //   try {
//   //     await fetch('http://localhost:3333/clientes', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({
//   //         ...data,
//   //         status: true,
//   //       }),
//   //     })
//   //     reset()
//   //     refetch()
//   //   } catch (error) {
//   //     alert('Erro ao cadastrar cliente')
//   //     console.error(error)
//   //   }
//   // }

//   const handleEdit = (cliente: Cliente) => {
//     setClienteEditando(cliente)
//     reset({ nome: cliente.nome, email: cliente.email })
//   }  

//   return (
//     <main className="p-6 space-y-6">
//       <h2 className="text-xl font-semibold">Clientes</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-md">
//         <Input placeholder="Nome" {...register('nome')} />
//         {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

//         <Input placeholder="Email" {...register('email')} />
//         {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//         {/* <Button type="submit">Cadastrar</Button> */}
//         <Button type="submit">
//   {       clienteEditando ? 'Salvar alterações' : 'Cadastrar'}
//         </Button>

//       </form>

//       <div>
//         <h3 className="font-bold">Lista de Clientes</h3>
//         {isLoading ? (
//           <p>Carregando...</p>
//         ) : (
//           <ul className="list-disc pl-4">
//             {clientes.map((cliente) => (
//               <li key={cliente.id} className="flex justify-between items-center">
//                 <span>
//                   {cliente.nome} ({cliente.email}) - {cliente.status}
//                 </span>
//                 <button
//                   className="text-blue-500 hover:underline"
//                   onClick={() => handleEdit(cliente)}
//                 >
//                   Editar cadastro
//                 </button>
//                 <Link href={`/clientes/${cliente.id}/alocacoes`}>
//                   <span className="text-blue-500 hover:underline">Ver alocações</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   )
// }