import { CurrentConfig } from "./config";
import { ethers, providers } from "ethers";

// Provider Functions

export function getProvider(): providers.Provider {
  return new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet);
}
