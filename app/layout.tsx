import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { ReduxProvider } from '@/components/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pokedex',
  description: 'Explore the Pokedex your go-to source for Pokemon details.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    
        <body className={inter.className}>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </body>
    </html>
  )
}
