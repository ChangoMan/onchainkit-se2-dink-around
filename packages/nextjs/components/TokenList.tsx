import { TokenRow } from "./TokenRow";
import type { Token } from "@coinbase/onchainkit/token";
import { useQuery } from "@tanstack/react-query";
import Pair from "~~/types/dexscreener/pair";

interface TokenListProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
}

type TokenPairData = {
  schemaVersion: string;
  pairs: Pair[];
};

async function getTokenPrices(tokenAddresses: string): Promise<TokenPairData> {
  const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function TokenList({ tokens }: TokenListProps) {
  const tokenAddresses = tokens.map(token => token.address).join(",");

  const { data, isPending } = useQuery<TokenPairData>({
    queryKey: ["tokenPrices", tokenAddresses],
    queryFn: () => getTokenPrices(tokenAddresses),
  });

  if (isPending) {
    return (
      <div>
        {tokens.map(token => (
          <div key={`${token.chainId}-${token.address}`} className="my-1 skeleton h-14 w-full"></div>
        ))}
      </div>
    );
  }

  const tokensWithPrices = tokens.map(token => {
    const tokenPair = data?.pairs?.find((pair: Pair) => {
      return pair.baseToken.address.toLowerCase() === token.address.toLowerCase();
    }) as Pair;

    if (!tokenPair) {
      return token;
    }

    return {
      ...token,
      ...tokenPair,
    };
  });

  return (
    <div>
      {tokensWithPrices.map(token => (
        <div key={`${token.chainId}-${token.address}`}>
          <TokenRow token={token} />
        </div>
      ))}
    </div>
  );
}
