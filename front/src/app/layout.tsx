import { Inter } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import { Providers } from "@/components/providers"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Meu Case Estágio",
  description: "Sistema de Clientes e Ativos",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <nav className="bg-gray-100 p-4 shadow">
            <ul className="flex gap-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/clientes" className="hover:underline">Clientes</Link></li>
              <li><Link href="/ativos" className="hover:underline">Ativos</Link></li>
            </ul>
          </nav>
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

// import { ReactNode } from "react"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import Link from "next/link"
// import { ReactQueryProvider } from "@/components/react-query-provider"; 


// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Meu Case Estágio",
//   description: "Sistema de Clientes e Ativos",
// }

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="pt-BR">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <ReactQueryProvider>
//           <nav className="bg-gray-100 dark:bg-gray-900 p-4 shadow">
//             <ul className="flex gap-4">
//               <li>
//                 <Link href="/" className="hover:underline">Home</Link>
//               </li>
//               <li>
//                 <Link href="/clientes" className="hover:underline">Clientes</Link>
//               </li>
//               <li>
//                 <Link href="/ativos" className="hover:underline">Ativos</Link>
//               </li>
//             </ul>
//           </nav>
//           <main className="p-4">{children}</main>
//           </ReactQueryProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
