import type { ErrorsByPackage, NetworkName } from "@polymedia/suitcase-core";

export const network: NetworkName = "devnet" as const;

export const networkIds = {
	mainnet: {
		digPkgId: "",
	},
	testnet: {
		digPkgId: "",
	},
	devnet: {
		digPkgId: "",
	},
	localnet: {
		digPkgId: "",
	},
}[network];

// === contract constants ===

// === contract errors ===

export const errorsByPackage: ErrorsByPackage = {
	[networkIds.digPkgId]: {},
};
