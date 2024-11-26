import { useCallback, useState } from "react";
import { getTokens } from "@coinbase/onchainkit/api";
import { Token, TokenChip, TokenRow, TokenSearch } from "@coinbase/onchainkit/token";

interface OnchainKitTokensProps {
  onTokenSelect: (token: Token) => void;
}

export const OnchainKitTokens = ({ onTokenSelect }: OnchainKitTokensProps) => {
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const handleChange = useCallback((value: string) => {
    async function getData(value: string) {
      const tokens = await getTokens({ search: value, limit: "5" });
      if (Array.isArray(tokens)) {
        setFilteredTokens(tokens as Token[]);
      }
    }
    getData(value);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[500px] gap-4 rounded-3xl p-4">
      <TokenSearch onChange={handleChange} delayMs={200} />
      {filteredTokens.length > 0 && (
        <div className="flex gap-2">
          {filteredTokens.map(token => (
            <TokenChip key={token.address} token={token} onClick={onTokenSelect} />
          ))}
        </div>
      )}
      {filteredTokens.length > 0 ? (
        <div>
          <div className="text-body text-black">Tokens</div>
          <div>
            {filteredTokens.map(token => (
              <TokenRow key={token.address} token={token} onClick={onTokenSelect} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-body text-black"></div>
      )}
    </div>
  );
};
