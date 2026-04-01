declare module 'auth/AuthProvider' {
  import type { ComponentType, ReactNode } from 'react'
  interface AuthProviderProps {
    children: ReactNode
  }
  const AuthProvider: ComponentType<AuthProviderProps>
  export default AuthProvider
  export { AuthProvider }
}

declare module 'auth/LoginPage' {
  import type { ComponentType } from 'react'
  const LoginPage: ComponentType
  export default LoginPage
  export { LoginPage }
}

declare module 'auth/SignupPage' {
  import type { ComponentType } from 'react'
  const SignupPage: ComponentType
  export default SignupPage
  export { SignupPage }
}

declare module 'products/ProductsPage' {
  import type { ComponentType } from 'react'
  const ProductsPage: ComponentType
  export default ProductsPage
  export { ProductsPage }
}

declare module 'products/ProductList' {
  import type { ComponentType } from 'react'
  const ProductList: ComponentType
  export default ProductList
  export { ProductList }
}

declare module 'products/ProductDetail' {
  import type { ComponentType } from 'react'
  const ProductDetail: ComponentType
  export default ProductDetail
  export { ProductDetail }
}

declare module 'orders/OrdersPage' {
  import type { ComponentType } from 'react'
  const OrdersPage: ComponentType
  export default OrdersPage
  export { OrdersPage }
}

declare module 'orders/OrderList' {
  import type { ComponentType } from 'react'
  const OrderList: ComponentType
  export default OrderList
  export { OrderList }
}

declare module 'orders/OrderDetail' {
  import type { ComponentType } from 'react'
  const OrderDetail: ComponentType
  export default OrderDetail
  export { OrderDetail }
}

declare module 'orders/CheckoutForm' {
  import type { ComponentType } from 'react'
  const CheckoutForm: ComponentType
  export default CheckoutForm
  export { CheckoutForm }
}
