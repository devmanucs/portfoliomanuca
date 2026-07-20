import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/providers/query-provider"
import { Toaster } from "@/components/ui/sonner"
import type { ISiteTheme } from "@portfoliomanuca/types"
import "./globals.css"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

async function getThemeOverrideStyle(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE_URL}/site-theme`, { cache: "no-store" })
    if (!res.ok) return ""

    const siteTheme = (await res.json()) as ISiteTheme
    const lightRules = Object.entries(siteTheme.tokens.light ?? {})
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")
    const darkRules = Object.entries(siteTheme.tokens.dark ?? {})
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")

    if (!lightRules && !darkRules) return ""
    return `:root { ${lightRules} } .dark { ${darkRules} }`
  } catch {
    return ""
  }
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
})

export const metadata: Metadata = {
  title: "Portfólio | Manuella Carvalho",
  description:
    "Desenvolvedora front-end apaixonada por design e tecnologia. Transformo ideias em interfaces incríveis e funcionais com foco na experiência do usuário.",
  icons: {
    icon: "/favicon.ico",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeOverrideStyle = await getThemeOverrideStyle()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {themeOverrideStyle ? (
          <style id="theme-overrides" dangerouslySetInnerHTML={{ __html: themeOverrideStyle }} />
        ) : null}
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} ${bricolage.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            {children}
            <Toaster richColors closeButton position="top-right" />
          </QueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
