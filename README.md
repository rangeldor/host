# Host MFE

Portal shell que consome todos os outros MFEs.

## Scripts

```bash
npm run dev          # Inicia em http://localhost:3000
npm run build        # Build para produção
npm run lint         # Verifica código
npm run test         # Executa testes
```

## Variáveis de Ambiente

```env
VITE_HOST_URL=http://localhost:3000
VITE_AUTH_URL=http://localhost:3005
VITE_PRODUCTS_URL=http://localhost:3006
VITE_ORDERS_URL=http://localhost:3007
```

## Arquitetura

O Host é um portal que:
- Consome os MFEs via Module Federation
- Fornece navegação entre os MFEs
- Exibe páginas de autenticação compartilhadas

## Estrutura

```
src/
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
├── shared/            # Componentes compartilhados
└── index.css          # Estilos globais
```
