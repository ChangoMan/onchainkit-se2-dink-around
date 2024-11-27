// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's
import { Token } from "@uniswap/sdk-core";
import { base } from "viem/chains";

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS = "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";
export const QUOTER_CONTRACT_ADDRESS = "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a";

// Currencies and Tokens

export const WETH_TOKEN = new Token(base.id, "0x4200000000000000000000000000000000000006", 18, "WETH", "Wrapped Ether");

export const USDC_TOKEN = new Token(base.id, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", 6, "USDC", "USD//C");
