# Halliday SDK Example with Privy Wallet

Halliday Payments SDK v4 integration example using a Privy embedded wallet. This project uses the Vite React template and the Privy React SDK. To connect the Privy wallet to the app, Ethers.js 6 is used with the Privy React SDK.

The Halliday React SDK (`@halliday-sdk/payments/react`) is used here:

- `<HallidayPaymentsProvider>` in `src/main.jsx` holds the declarative config (API key, deposit and withdrawal assets) and warms the widget on mount.
- `useHallidayPayments()` in `src/App.jsx` returns `openDeposit`, `openWithdrawal`, `openActivity`, `isReady`, and `updateWallets`.
- `updateWallets()` pushes the connected Privy wallet in as the payment `owner` and as the deposit/withdrawal funder, using `connectSigner` from `@halliday-sdk/payments/ethers`.

### Keys

Get a Privy app ID: https://www.privy.io/

Get a free Halliday API key now: https://dashboard.halliday.xyz

### Run

Edit the `.env` files by supplanting the Privy and Halliday keys. See `.env.example` for details.

```
VITE_PRIVY_APP_ID=_your_privy_app_id_here_
VITE_HALLIDAY_API_KEY=_your_api_key_here_
```

Run the app using the command line:

```
npm install
npm run dev
```