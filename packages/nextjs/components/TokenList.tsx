import { TokenRow } from "./TokenRow";
import type { Token } from "@coinbase/onchainkit/token";
import { useQuery } from "@tanstack/react-query";
import { Pair, TokenWithData } from "~~/types/dexscreener/pair";

interface TokenListProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
}

type TokenPairData = {
  schemaVersion: string;
  pairs: Pair[];
};

const TOKEN_PAIR_DEFAULT = {
  url: "",
  pairAddress: "",
  dexId: "",
  chainId: "",
  priceNative: "",
  priceUsd: "",
  marketCap: "",
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
          <div key={`${token.chainId}-${token.address}`} className="my-2 skeleton h-20 w-full"></div>
        ))}
      </div>
    );
  }

  const tokensWithPrices = tokens.map(token => {
    const tokenPair = data?.pairs?.find((pair: Pair) => {
      return pair.baseToken.address.toLowerCase() === token.address.toLowerCase();
    }) as Pair;

    if (!tokenPair) {
      return {
        ...token,
        ...TOKEN_PAIR_DEFAULT,
      };
    }

    return {
      ...token,
      ...tokenPair,
    };
  });

  return (
    <dl className="mt-5 grid grid-cols-1 gap-5">
      {tokensWithPrices.map(token => (
        <TokenRow key={`${token.chainId}-${token.address}`} token={token as TokenWithData} />
      ))}
    </dl>
  );
}
