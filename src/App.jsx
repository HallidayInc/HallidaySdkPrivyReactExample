import { usePrivy, useWallets } from '@privy-io/react-auth'
import { openHallidayPayments, openWithdraw, openActivity, initializeClient } from '@halliday-sdk/payments'
import { connectSigner } from '@halliday-sdk/payments/ethers'
import { BrowserProvider } from 'ethers'

const HALLIDAY_PUBLIC_API_KEY = import.meta.env.VITE_HALLIDAY_API_KEY
const hallidayOutputs = [
  'base:0x',
  'base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
]

initializeClient({
  apiKey: HALLIDAY_PUBLIC_API_KEY,
  onReady: () => console.log('Halliday SDK widget preloaded'),
  onError: (e) => console.error('Halliday SDK Error:', e),
  outputs: hallidayOutputs,
});

function App() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  if (!ready) return <p>Loading Privy...</p>;

  const wallet = wallets.find(w => w.walletClientType === 'privy');
  const enabled = authenticated && !!wallet;

  const getSigner = async () => {
    const provider = await wallet.getEthereumProvider();
    return connectSigner(() => new BrowserProvider(provider).getSigner(wallet.address));
  };

  const launchHalliday = async () => openHallidayPayments({
    userWallet: await getSigner()
  });

  const launchWithdraw = async () => openWithdraw({
    withdrawInputs: hallidayOutputs,
    withdrawFunder: await getSigner()
  });

  // Note openActivity cannot be properly called until a userWallet, funder or 
  // owner is provided to initializeClient or openHallidayPayments

  return (
    <div className="halliday-container">
      <h1>Halliday SDK Privy Example</h1>
      <button onClick={authenticated ? logout : login}>
        {authenticated ? 'Log out of Privy' : 'Sign in with Privy'}
      </button>
      <button disabled={!enabled} onClick={launchHalliday}>
        Deposit with Halliday
      </button>
      <button disabled={!enabled} onClick={launchWithdraw}>
        Withdraw
      </button>
      <button disabled={!enabled} onClick={openActivity}>
        Activity
      </button>
    </div>
  );
}

export default App
