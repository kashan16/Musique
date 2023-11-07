import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
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
        <Sidebar>
          {children}
        </Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
