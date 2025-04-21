import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BragBout - Student Social Network",
  description: "Connect with seniors and classmates from your college",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#10b981",
              colorBackground: "#ffffff",
              colorText: "#000000",
              colorTextSecondary: "#666666",
              colorTextOnPrimaryBackground: "#ffffff",
            },
          }}
        >
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="flex min-h-screen flex-col">
                <Nav />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}