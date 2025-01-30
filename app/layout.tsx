import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
//import { getServerSession } from "next-auth"
import SessionProvider from "../components/SessionProvider"
import { ChakraProvider } from '@chakra-ui/react'

const mmono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PaperDog',
  description: 'THE AI x Crypto Experience',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const session = await getServerSession()

  return (
      <html lang="en">
        <body className={mmono.className}>
          <SessionProvider >
              <ChakraProvider>
                {children}   
              </ChakraProvider>
          </SessionProvider>
        </body>
      </html>
  )
}
