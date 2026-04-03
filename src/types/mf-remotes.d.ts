declare module 'auth/AuthProvider' {
  import type { ComponentType, ReactNode } from 'react'
  const AuthProvider: ComponentType<{ children: ReactNode }>
  export default AuthProvider
}

declare module 'auth/LoginPage' {
  import type { ComponentType } from 'react'
  const LoginPage: ComponentType
  export default LoginPage
}

declare module 'auth/SignupPage' {
  import type { ComponentType } from 'react'
  const SignupPage: ComponentType
  export default SignupPage
}

declare module 'auth/AuthNav' {
  import type { ComponentType } from 'react'
  const AuthNav: ComponentType
  export default AuthNav
}

declare module 'auth/authActions' {
  export function invalidateAuth(): void
  export function logout(): void
}

declare module 'auth/ProtectedRoute' {
  import type { ComponentType, ReactNode } from 'react'
  const ProtectedRoute: ComponentType<{ children: ReactNode; fallbackUrl?: string }>
  export default ProtectedRoute
}

declare module 'auth/useAuth' {
  const useAuth: () => {
    user: { id: string; name: string; email: string } | null
    isAuthenticated: boolean
    login: (credentials: { email: string; password: string }) => void
    signup: (credentials: { email: string; password: string; name: string }) => void
    logout: () => void
    isLoading: boolean
    error: Error | null
  }
  export default useAuth
}

declare module 'auth/UserMenu' {
  import type { ComponentType } from 'react'
  const UserMenu: ComponentType
  export default UserMenu
}

declare module 'auth/routes' {
  import type { RouteObject } from 'react-router'
  export const authRoutes: RouteObject[]
}

declare module 'products/ProductsPage' {
  import type { ComponentType } from 'react'
  const ProductsPage: ComponentType
  export default ProductsPage
}

declare module 'products/NuqsAdapter' {
  import type { ComponentType } from 'react'
  const NuqsAdapter: ComponentType<{ children: React.ReactNode }>
  export { NuqsAdapter }
}

declare module 'products/ProductList' {
  import type { ComponentType } from 'react'
  const ProductList: ComponentType
  export default ProductList
}

declare module 'products/ProductCard' {
  import type { ComponentType } from 'react'
  const ProductCard: ComponentType
  export default ProductCard
}

declare module 'products/ProductDetail' {
  import type { ComponentType } from 'react'
  const ProductDetail: ComponentType
  export default ProductDetail
}

declare module 'orders/OrdersPage' {
  import type { ComponentType } from 'react'
  const OrdersPage: ComponentType
  export default OrdersPage
}

declare module 'orders/NuqsAdapter' {
  import type { ComponentType } from 'react'
  const NuqsAdapter: ComponentType<{ children: React.ReactNode }>
  export { NuqsAdapter }
}

declare module 'orders/OrderList' {
  import type { ComponentType } from 'react'
  const OrderList: ComponentType
  export default OrderList
}

declare module 'orders/OrderDetail' {
  import type { ComponentType } from 'react'
  const OrderDetail: ComponentType
  export default OrderDetail
}

declare module 'orders/CheckoutForm' {
  import type { ComponentType } from 'react'
  const CheckoutForm: ComponentType
  export default CheckoutForm
}
