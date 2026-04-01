import { useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { NuqsAdapter as HostNuqsAdapter } from 'nuqs/adapters/react-router/v6'

function resolveDefault(m: any, candidates: string[]) {
  return m?.default ?? candidates.map((c) => m?.[c]).find(Boolean)
}

export function OrdersWrapper() {
  const [Component, setComponent] = useState<any>(null)
  const [Adapter, setAdapter] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    Promise.allSettled([
      import('orders/OrdersPage'),
      import('orders/NuqsAdapter').catch(() => undefined),
    ])
      .then(([pageRes, adapterRes]) => {
        if (!mounted) return
        const pageModule = pageRes.status === 'fulfilled' ? pageRes.value : null
        const adapterModule = adapterRes && adapterRes.status === 'fulfilled' ? adapterRes.value : null

        const Comp = resolveDefault(pageModule ?? {}, ['OrdersPage', 'OrdersPageHost', 'OrdersApp'])
        // Prefer the remote adapter when available so it sets context for the
        // remote's nuqs instance. Fall back to host adapter otherwise.
        const AdapterCandidate = adapterModule?.NuqsAdapter ?? HostNuqsAdapter

        

        // Set adapter first so the adapter context exists before the remote
        // component mounts and runs hooks like useQueryState
        setAdapter(() => AdapterCandidate)
        setComponent(() => Comp)
      })
      .catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

  if (!Component) {
    return null
  }

  const Remote = Component

  return (
    <QueryClientProvider client={queryClient}>
      {Adapter ? (
        // @ts-ignore
        <Adapter>
          {/* @ts-ignore */}
          <Remote />
        </Adapter>
      ) : (
        // @ts-ignore
        <Remote />
      )}
    </QueryClientProvider>
  )
}

export default OrdersWrapper
