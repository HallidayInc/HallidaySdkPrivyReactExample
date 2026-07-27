import { useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useHallidayPayments } from '@halliday-sdk/payments/react'
import { connectSigner } from '@halliday-sdk/payments/ethers'
import { BrowserProvider } from 'ethers'

function HallidayEventLogger() {
  const { instance } = useHallidayPayments()

  useEffect(() => {
    const offStatus = instance.on('status', (s) => console.log(`status: ${s.type}`))
    const offError = instance.on('error', (e) => console.log(`error (${e.source}): ${e.message}`))
    const offClose = instance.on('close', () => console.log('widget closed'))

    return () => {
      offStatus()
      offError()
      offClose()
    }
  }, [instance])

  return null
}

export default function App() {
  const { ready, authenticated, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const { openDeposit, openWithdrawal, openActivity, updateWallets, isReady } =
    useHallidayPayments()

  const wallet = wallets.find((w) => w.walletClientType === 'privy')
  const enabled = authenticated && wallet && isReady

  useEffect(() => {
    if (!wallet) return

    const owner = connectSigner(async () =>
      new BrowserProvider(await wallet.getEthereumProvider()).getSigner(wallet.address),
    )

    updateWallets({
      owner,
      deposit: { funders: [owner], destinationAddress: wallet.address },
      withdrawal: { funder: owner },
    })
  }, [wallet, updateWallets])

  if (!ready) return <p>Loading Privy...</p>

  return (
    <div className="halliday-container">
      <HallidayEventLogger />
      <h1>Halliday SDK Privy Example</h1>
      <button onClick={authenticated ? logout : login}>
        {authenticated ? 'Log out of Privy' : 'Sign in with Privy'}
      </button>
      <button disabled={!enabled} onClick={openDeposit}>
        Deposit with Halliday
      </button>
      <button disabled={!enabled} onClick={openWithdrawal}>
        Withdraw
      </button>
      <button disabled={!enabled} onClick={openActivity}>
        Activity
      </button>
      {wallet && <span>Privy wallet address: {wallet.address}</span>}
    </div>
  )
}
