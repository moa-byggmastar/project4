import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { getSession } from "@/lib/auth-server"
import { LogoutButton } from "@/components/logout-button"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hair Salon',
  description: 'Hair salon booking app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='min-h-screen flex bg-muted/40'>
          {/* Sidebar */}
          {session && (
            <aside className='w-64 bg-primary/15 border-r p-6 flex flex-col justify-between'>
              <div className='space-y-6'>
                {/* Profile */}
                <div className='flex items-center gap-3'>
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name ?? 'Profile picture'}
                      className='w-10 h-10 rounded-full'
                    />
                  )}
                  <div>
                    <div className='font-semibold leading-tight'>
                      {session.user.name}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      Logged in via GitHub
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <LogoutButton />
            </aside>
          )}

          {/* Main content */}
          <main className='flex-1 p-8'>
            <div className='max-w-3xl'>
              <header className='mb-8 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>
                  Hair Salon
                </h1>
                <p className='text-muted-foreground'>
                  Book your next self-care moment
                </p>
              </header>

              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}