import { lazy, Suspense, useEffect, useState } from 'react'
import { NuqsAdapter as HostNuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import OrdersWrapper from './OrdersWrapper'

const resolveRemoteDefault = (m: any, candidates: string[] = []) => {
  const found = m.default ?? candidates.map((c) => m[c]).find(Boolean)
  return { default: found }
}

const LoginPage = lazy(() =>
  import('auth/LoginPage')
    .then((m) => resolveRemoteDefault(m, ['LoginPage', 'LoginPageHost', 'AuthApp']))
)

const SignupPage = lazy(() =>
  import('auth/SignupPage')
    .then((m) => resolveRemoteDefault(m, ['SignupPage', 'SignupPageHost', 'AuthApp']))
)

const UserMenu = lazy(() =>
  import('auth/UserMenu')
    .then((m) => ({ default: m.UserMenu ?? m.default }))
)

const ProductsPage = lazy(async () => {
  const [pageModule, adapterModule] = await Promise.allSettled([
    import('products/ProductsPage'),
    import('products/NuqsAdapter').catch(() => undefined),
  ])

  const page = pageModule.status === 'fulfilled' ? pageModule.value : null
  const adapter = adapterModule && adapterModule.status === 'fulfilled' ? adapterModule.value : null

  const resolved = resolveRemoteDefault(page ?? {}, ['ProductsPage', 'ProductsPageHost', 'ProductsApp'])
  const Component = resolved.default

  const Adapter = HostNuqsAdapter ?? adapter?.NuqsAdapter
  if (Adapter) {
    const Wrapped = () => (
      <Adapter>
        {/* @ts-ignore */}
        <Component />
      </Adapter>
    )
    return { default: Wrapped }
  }

  return { default: Component }
})

const OrdersPage = lazy(async () => {
  const [pageModule, adapterModule] = await Promise.allSettled([
    import('orders/OrdersPage'),
    import('orders/NuqsAdapter').catch(() => undefined),
  ])

  const page = pageModule.status === 'fulfilled' ? pageModule.value : null
  const adapter = adapterModule && adapterModule.status === 'fulfilled' ? adapterModule.value : null

  const resolved = resolveRemoteDefault(page ?? {}, ['OrdersPage', 'OrdersPageHost', 'OrdersApp'])
  const Component = resolved.default

  const Adapter = HostNuqsAdapter ?? adapter?.NuqsAdapter
  if (Adapter) {
    const Wrapped = () => (
      <Adapter>
        {/* @ts-ignore */}
        <Component />
      </Adapter>
    )
    return { default: Wrapped }
  }

  return { default: Component }
})

const SkeletonFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
    <div className="w-64 h-8 bg-muted animate-pulse rounded" />
  </div>
)

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-muted/50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao MFE App</h1>
        <p className="text-muted-foreground mb-8">
          Navegue para acessar os micro-frontends
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/produtos"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Produtos
          </Link>
          <Link
            to="/pedidos"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
          >
            Pedidos
          </Link>
        </div>
      </div>
    </div>
  )
}

function AuthNav() {
  const [useAuthHook, setUseAuthHook] = useState<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const m = await import('auth/useAuth')
      setUseAuthHook(() => m.useAuth ?? m.default)
      setReady(true)
    })()
  }, [])

  if (!ready) {
    return (
      <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
        Entrar
      </Link>
    )
  }

  const { isAuthenticated } = useAuthHook()
  if (isAuthenticated()) return <UserMenu />
  return (
    <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
      Entrar
    </Link>
  )
}

function App() {
  const [AuthProvider, setAuthProvider] = useState<any>(null)

  useEffect(() => {
    import('auth/AuthProvider')
      .then((m) => {
        const Provider = m.AuthProvider ?? m.default
        if (Provider) setAuthProvider(() => Provider)
      })
      .catch(() => {})
  }, [])

  if (!AuthProvider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-64 h-8 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-background">
            <nav className="container mx-auto flex items-center justify-between py-4 px-4">
              <Link to="/" className="font-bold text-xl">
                MFE App
              </Link>
              <div className="flex gap-4">
                <Link
                  to="/produtos"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Produtos
                </Link>
                <Link
                  to="/pedidos"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pedidos
                </Link>
                <AuthNav />
              </div>
            </nav>
          </header>
          <main className="flex-1">
            <Suspense fallback={<SkeletonFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/produtos/*"
                  element={
                    <QueryClientProvider client={queryClient}>
                      <ProductsPage />
                    </QueryClientProvider>
                  }
                />
                <Route path="/pedidos/*" element={<OrdersWrapper />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="border-t py-4 text-center text-sm text-muted-foreground">
            MFE Host © 2026
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export { App }
