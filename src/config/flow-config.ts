import { config } from "@onflow/fcl";

config({
  "app.detail.title": "Eventura",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "fcl.eventsPollRate": 2500,
  "fcl.limit": 50,
  "discovery.authn.endpoint":
    "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x82ec283f88a62e65", "0x9d2e44203cb13051"], // Blocto & Lilico
  "services.WalletConnect.projectId":
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
});
