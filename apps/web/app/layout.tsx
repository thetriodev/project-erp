import { Geist, Geist_Mono } from 'next/font/google'
import '@workspace/ui/globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

// meta function

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <ThemeProvider
          attribute="class"
          // defaultTheme="system" // default to 'light' on initial load but in development mode it will be 'system'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
