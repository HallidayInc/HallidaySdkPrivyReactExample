import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { base } from 'viem/chains'
import { HallidayPaymentsProvider } from '@halliday-sdk/payments/react'
import App from './App.jsx'
import './index.css'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID
const HALLIDAY_API_KEY = import.meta.env.VITE_HALLIDAY_API_KEY

if (!PRIVY_APP_ID || !HALLIDAY_API_KEY) {
  alert('Error: Missing API keys. See .env.example file.')
}

// ETH and USDC on Base
const tokens = ['base:0x', 'base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913']

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          ethereum: { createOnLogin: 'users-without-wallets' },
        },
        supportedChains: [base],
        defaultChain: base,
      }}
    >
      <HallidayPaymentsProvider
        apiKey={HALLIDAY_API_KEY}
        deposit={{ outputs: tokens }}
        withdrawal={{ inputs: tokens }}
      >
        <App />
      </HallidayPaymentsProvider>
    </PrivyProvider>
  </StrictMode>,
)
