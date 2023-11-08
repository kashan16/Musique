import Sidebar from '@/components/Sidebar'
import ModelProvider from '@/providers/ModelProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import { Figtree } from 'next/font/google'
import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Musique',
  description: 'Listen To Music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider/>
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
