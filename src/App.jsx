import { useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { openHallidayPayments, initializeClient } from '@halliday-sdk/payments'
import { connectSigner } from '@halliday-sdk/payments/ethers'
import { BrowserProvider } from 'ethers'
import './App.css'

const HALLIDAY_PUBLIC_API_KEY = import.meta.env.VITE_HALLIDAY_API_KEY
const hallidayOutputs = [
  'base:0x',
  'base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
]

function App() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const initPrivy = async () => {
    login();
  };

  useEffect(() => {
    initializeClient({
      apiKey: HALLIDAY_PUBLIC_API_KEY,
      onReady: () => { console.log('Preloaded and ready'); },
      onError: (error) => { console.error(error); },
      outputs: hallidayOutputs,
    });
  }, []);

  const launchHalliday = async () => {
    const wallet = wallets[0];

    if (!wallet) {
      console.error('No Privy wallet found');
      return;
    }

    const provider = await wallet.getEthereumProvider();

    const connectedSigner = connectSigner(() => {
      return new BrowserProvider(provider).getSigner();
    });

    openHallidayPayments({
      apiKey: HALLIDAY_PUBLIC_API_KEY,
      outputs: hallidayOutputs,
      userWallet: connectedSigner,
      funder: connectedSigner,
    });
  };

  if (!ready) {
    return <p>Loading Privy...</p>;
  }

  if (!authenticated) {
    return (
      <button onClick={initPrivy}>
        Sign in with Privy
      </button>
    );
  }

  // Find the privy wallet to display address
  // const privyWallet = wallets.find(w => w.walletClientType === 'privy');
  const wallet = wallets[0];

  return (
    <div>
      <button onClick={logout}>
        Log out of Privy
      </button>
      <p>Privy Address: {wallet?.address || 'Loading...'}</p>
      <br />
      <button onClick={launchHalliday}>
        Open Halliday
      </button>
    </div>
  );
}

export default App