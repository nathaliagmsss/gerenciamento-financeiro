"use client";

import { useQuery } from "@tanstack/react-query";

type Ativo = {
  name: string;
  value: number;
};

export default function AtivosPage() {
  const { data, isLoading } = useQuery<Ativo[]>({
    queryKey: ["ativos-fixos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3333/ativos-fixos");
      return await res.json();
    },
  });

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold">Ativos Fixos</h2>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white p-6 rounded-md shadow-md">
          {data?.map((ativo) => (
            <li key={ativo.name} className="py-3">
              <p className="font-medium">{ativo.name}</p>
              <p className="text-muted-foreground">R$ {ativo.value.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}


// "use client";

// import { useQuery } from "@tanstack/react-query";

// type Ativo = {
//   id: number;
//   name: string;
//   value: number;
// };

// export default function AtivosPage() {
//   const { data, isLoading } = useQuery<Ativo[]>({
//     queryKey: ["ativos"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:3333/assets");
//       return await res.json();
//     },
//   });

//   return (
//     <main className="p-8 max-w-3xl mx-auto space-y-6">
//       <h2 className="text-3xl font-semibold">Ativos Financeiros</h2>

//       {isLoading ? (
//         <p>Carregando...</p>
//       ) : (
//         <ul className="divide-y divide-gray-200 bg-white p-6 rounded-md shadow-md">
//           {data?.map((ativo) => (
//             <li key={ativo.id} className="py-3">
//               <p className="font-medium">{ativo.name}</p>
//               <p className="text-muted-foreground">R$ {ativo.value.toFixed(2)}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }


// // "use client";

// // import { useQuery } from '@tanstack/react-query'

// // type Asset = {
// //   id: number
// //   name: string
// //   value: number
// //   clienteId: number
// // }

// // export default function AtivosPage() {
// //   const { data, isLoading } = useQuery<Ativo[]>({
// //     queryKey: ['ativos'],
// //     queryFn: async () => {
// //       const res = await fetch('http://localhost:3333/assets')
// //       return await res.json()
// //     },
// //   })

// //   return (
// //     <main className="p-6 space-y-4">
// //       <h2 className="text-xl font-semibold">Ativos Financeiros</h2>

// //       {isLoading ? (
// //         <p>Carregando...</p>
// //       ) : (
// //         <ul className="list-disc pl-4">
// //   {data.map((ativo) => (
// //     <li key={ativo.id}>
// //       {ativo.name} - R$ {ativo.value.toFixed(2)}
// //     </li>
// //   ))}
// // </ul>

// //       )}
// //     </main>
// //   )
// // }