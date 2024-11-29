/* eslint-disable @next/next/no-img-element */
import { TokenWithData } from "~~/types/dexscreener/pair";

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
    <div className="flex flex-col md:flex-row rounded-md border border-base-100 bg-base-300 mb-4 px-4 py-1 shadow-sm">
      <div className="py-4 flex flex-1 items-center gap-4">
        <div className="md:shrink-0">
          {token.image && <img alt={token.name} src={token.image} className="size-10 rounded-full" />}
        </div>
        <div>
          <p className="m-0 text-sm font-medium text-base-content">{token.name}</p>
          <p className="m-0 truncate text-sm text-gray-500 dark:text-gray-400">{token.symbol}</p>
        </div>
        <a
          className="inline-block ml-auto p-1 bg-gray-700 rounded-full shrink-0 md:mr-4"
          href={token.url}
          target="blank"
        >
          <img src="/logo-dex-screener.svg" alt="Dex Screener" className="w-5 h-5" />
        </a>
      </div>
      <div className="pb-4 md:py-4 md:ml-auto">
        <div className="flex items-center md:gap-4">
          <div className="flex justify-between items-center flex-1">
            <div className="px-2">
              <p className="m-0 text-sm text-base-content">Price: ${token.priceUsd}</p>
              {token.marketCap && (
                <p className="m-0 text-sm text-green-600 dark:text-green-500">
                  Market Cap: ${formatNumberWithAbbreviation(token.marketCap)}
                </p>
              )}
            </div>
            <div className="flex items-center ml-auto">
              <button className="mx-1 btn btn-sm btn-outline">Buy</button>
              <button className="mx-1 btn btn-sm btn-outline">Sell</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
