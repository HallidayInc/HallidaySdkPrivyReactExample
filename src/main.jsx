import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import App from './App.jsx'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID
const HALLIDAY_API_KEY = import.meta.env.VITE_HALLIDAY_API_KEY

if (
  !PRIVY_APP_ID ||
  !HALLIDAY_API_KEY ||
  PRIVY_APP_ID === '_your_privy_app_id_here_' ||
  HALLIDAY_API_KEY === '_your_api_key_here_'
) {
  alert('Error: Missing API keys. See .env file.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
