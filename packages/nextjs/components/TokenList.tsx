import type { Token } from "@coinbase/onchainkit/token";
import { TokenRow } from "@coinbase/onchainkit/token";
import { quote } from "~~/utils/uniswap/quote";

interface TokenListProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
}

export function TokenList({ tokens, onTokenClick }: TokenListProps) {
  console.log("tokens", tokens);

  return (
    <div className="">
      {tokens.map(token => (
        <div key={`${token.chainId}-${token.address}`} className="">
          <TokenRow token={token} onClick={onTokenClick} className="mb-2" />
          <button
            className="btn btn-primary"
            onClick={async () => {
              const amount = await quote();
              console.log("quote", amount);
            }}
          >
            Quote
          </button>
        </div>
      ))}
    </div>
  );
}
