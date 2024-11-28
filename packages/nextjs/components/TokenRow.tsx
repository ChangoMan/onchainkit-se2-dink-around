/* eslint-disable @next/next/no-img-element */
import type { Token } from "@coinbase/onchainkit/token";
import Pair from "~~/types/dexscreener/pair";

type TokenWithData = Token & Pair;

function formatNumberWithAbbreviation(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "b";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "m";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export function TokenRow({ token }: { token: TokenWithData }) {
  return (
    <div className="relative flex items-center rounded-md border border-base-100 bg-base-300 mb-4 px-6 py-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
      <div className="shrink-0">
        {token.image && <img alt={token.name} src={token.image} className="size-10 rounded-full" />}
      </div>
      <div className="ml-4">
        <p className="mb-0 text-sm font-medium text-gray-50">{token.name}</p>
        <p className="mt-1 truncate text-sm text-gray-400">{token.symbol}</p>
      </div>
      <div className="ml-auto">
        <div className="flex items-center gap-4">
          <a href={token.url} target="blank">
            <img src="/logo-dex-screener.svg" alt="Dex Screener" className="w-6 h-6" />
          </a>
          <div className="mx-4">
            <p className="mb-0 text-sm text-gray-50">Price: ${token.priceUsd}</p>
            {token.marketCap && (
              <p className="mt-1 text-sm text-green-500">
                Market Cap: ${formatNumberWithAbbreviation(token.marketCap)}
              </p>
            )}
          </div>
          <button className="btn btn-sm btn-outline">Buy</button>
          <button className="btn btn-sm btn-outline">Sell</button>
        </div>
      </div>
    </div>
  );
}
