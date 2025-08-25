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
		digPkgId: "0xed3a85ea6794f8c5e2666ef42a4aea44ccffb4783ffa44f67ff0bb12bfbf692b",
		holeObjId: "0x250e9a3566195d769a1377e1b174d05d8ad337288dc186a40039d930bb306212",
	},
}[network];

// === contract constants ===

// === contract errors ===

export const errorsByPackage: ErrorsByPackage = {
	[networkIds.digPkgId]: {},
};
