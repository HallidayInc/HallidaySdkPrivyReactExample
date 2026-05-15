# Halliday SDK Example with Privy Wallet

Halliday Payments SDK integration example using a Privy wallet. This project uses the Vite React template and the Privy React SDK. To connect the Privy wallet to the app, Ethers.js 6 is used with the Privy React SDK.

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