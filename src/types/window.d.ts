import { ExternalProvider } from "@ethersproject/providers";

export {};

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}
