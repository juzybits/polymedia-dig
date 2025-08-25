import type { ErrorsByPackage, NetworkName } from "@polymedia/suitcase-core";

export const network: NetworkName = "localnet" as const;

export const networkIds = {
	mainnet: {
		digPkgId: "",
		holeObjId: "",
	},
	testnet: {
		digPkgId: "",
		holeObjId: "",
	},
	devnet: {
		digPkgId: "",
		holeObjId: "",
	},
	localnet: {
		digPkgId: "0x8af01768c0bcb2eb039fec60ef45bd81e049c82b488025c50e8601f16ab2bce0",
		holeObjId: "0xfde5d9bf000b88792525204ce6b16d73232390fb06c03d1a282768824ac1b367",
	},
}[network];

// === contract constants ===

// === contract errors ===

export const errorsByPackage: ErrorsByPackage = {
	[networkIds.digPkgId]: {},
};
