"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnchainKitTokens } from "./onchainkit-examples/_components/OnchainKitTokens";
import { setOnchainKitConfig } from "@coinbase/onchainkit";
import { getTokens } from "@coinbase/onchainkit/api";
import type { Token } from "@coinbase/onchainkit/token";
import type { NextPage } from "next";
import { TokenList } from "~~/components/TokenList";

const Home: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tokenKey, setTokenKey] = useState(0);
  const [knownTokens, setKnownTokens] = useState<Token[]>([]);

  // Initialize OnchainKit with API key from env
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY) {
      setOnchainKitConfig({ apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY });
    }
  }, []);

  // Initialize knownTokens from URL params
  useEffect(() => {
    const fetchTokenDetails = async (addresses: string[]) => {
      const tokenPromises = addresses.map(async address => {
        // Convert zero address back to empty string when fetching
        const searchAddress = address === "0x0000000000000000000000000000000000000000" ? "" : address;
        try {
          const response = (await getTokens({ limit: "1", search: searchAddress })) as Token[];
          console.log("response", response);
          return response[0];
        } catch (error) {
          console.error(`Error fetching token ${address}:`, error);
          return null;
        }
      });

      const tokens = await Promise.all(tokenPromises);
      setKnownTokens(tokens.filter((token: Token | null) => token !== null) as Token[]);
    };

    const tokensParam = searchParams.get("tokens");
    if (tokensParam) {
      const tokenAddresses = tokensParam.split(",");
      fetchTokenDetails(tokenAddresses);
    } else {
      setKnownTokens([]);
    }
  }, [searchParams]);

  // Update URL when knownTokens changes
  useEffect(() => {
    if (knownTokens.length > 0) {
      const newTokensParam = knownTokens
        .map(
          t =>
            // Use zero address in URL if contract address is empty
            t.address || "0x0000000000000000000000000000000000000000",
        )
        .join(",");
      router.push(`?tokens=${newTokensParam}`);
    }
  }, [knownTokens, router]);

  const handleTokenSelect = (token: Token) => {
    console.log("SELECTED", token);
    setTokenKey(prev => prev + 1);

    // Add token to knownTokens if it doesn't exist already
    setKnownTokens(prev => {
      const tokenExists = prev.some(t => t.address === token.address);
      if (!tokenExists) {
        return [...prev, token];
      }
      return prev;
    });
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full max-w-3xl">
          {knownTokens.length > 0 && (
            <div className="w-full">
              <TokenList tokens={knownTokens} onTokenClick={token => console.log("clicked:", token)} />
            </div>
          )}
          <div>
            <OnchainKitTokens key={tokenKey} onTokenSelect={handleTokenSelect} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
