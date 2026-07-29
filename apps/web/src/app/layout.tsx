import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AdminScopeSync } from "@/components/admin-scope-sync"
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
    // Scoped to the admin panel only (see `.admin-scope` in globals.css) --
    // the customizer at /admin/aparencia never touches the public site's tokens.
    return `.admin-scope { ${lightRules} } .admin-scope.dark, .dark .admin-scope { ${darkRules} }`
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
        {/*
          Blocking script (mirrors next-themes' own no-flash approach): puts
          `admin-scope` on <html> before first paint so Radix portals
          (Sheet/Dialog/Select/Toast, which mount straight under <body>)
          inherit the neutral admin tokens instead of the brand ones. Client
          navigations after hydration are handled by <AdminScopeSync>.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname.startsWith('/admin'))document.documentElement.classList.add('admin-scope')}catch(e){}",
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} ${bricolage.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <AdminScopeSync />
            {children}
            <Toaster richColors closeButton position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
