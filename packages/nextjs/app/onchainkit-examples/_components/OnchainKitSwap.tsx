import { Swap, SwapAmountInput, SwapButton, SwapMessage, SwapToggleButton } from "@coinbase/onchainkit/swap";
import {
  SwapSettings,
  SwapSettingsSlippageDescription,
  SwapSettingsSlippageInput,
  SwapSettingsSlippageTitle,
} from "@coinbase/onchainkit/swap";
import type { Token } from "@coinbase/onchainkit/token";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";

export function OnchainKitSwap() {
  const { address } = useAccount();

  const FromToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: null,
  };

  /*
  const FromToken: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    image: null,
  };*/
  /*
  const ETHToken: Token = {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    chainId: 8453,
    decimals: 18,
    name: "DAI",
    symbol: "DAI",
    image: null,
  };*/

  const ToToken: Token = {
    address: "0x15bbf2456218d6bd585b118783acb4f8bf4e2daf",
    chainId: 8453,
    decimals: 18,
    name: "bug",
    symbol: "bug",
    image: null,
  };

  const swappableTokens: Token[] = [FromToken, ToToken];

  return address ? (
    <Swap>
      <SwapSettings>
        <SwapSettingsSlippageTitle>Max. slippage</SwapSettingsSlippageTitle>
        <SwapSettingsSlippageDescription>
          Your swap will revert if the prices change by more than the selected percentage.
        </SwapSettingsSlippageDescription>
        <SwapSettingsSlippageInput />
      </SwapSettings>
      <SwapAmountInput label="Sell" swappableTokens={swappableTokens} token={FromToken} type="from" />
      <SwapToggleButton />
      <SwapAmountInput label="Buy" swappableTokens={swappableTokens} token={ToToken} type="to" />
      <SwapButton />
      <SwapMessage />
    </Swap>
  ) : (
    <ConnectWallet />
  );
}
