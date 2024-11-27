/* eslint-disable @next/next/no-img-element */
import type { Token } from "@coinbase/onchainkit/token";

export function TokenRow({ token }: { token: Token }) {
  return (
    <div className="relative flex items-center rounded-lg border border-base-100 bg-base-300 mb-4 px-6 py-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
      <div className="shrink-0">
        {token.image && <img alt={token.name} src={token.image} className="size-10 rounded-full" />}
      </div>
      <div className="ml-4">
        <p className="mb-0 text-sm font-medium text-gray-50">{token.name}</p>
        <p className="mt-1 truncate text-sm text-gray-400">{token.symbol}</p>
      </div>
      <div className="ml-auto">
        <div className="flex items-center gap-4">
          <img src="/logo-dex-screener.svg" alt="Dex Screener" className="w-6 h-6" />
          <button className="btn btn-sm btn-outline">Buy</button>
          <button className="btn btn-sm btn-outline">Sell</button>
        </div>
      </div>
    </div>
  );
}
