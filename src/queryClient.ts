import { QueryClient } from '@tanstack/react-query'

// Single shared QueryClient instance provided by the host to federated remotes
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // keep sensible defaults for MFEs; adjust as needed
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient
