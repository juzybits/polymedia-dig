import type { ErrorsByPackage, NetworkName } from "@polymedia/suitcase-core";

export const network: NetworkName = "devnet" as const;

export const networkIds = {
	mainnet: {
		digPkgId: "0x01497e97d64aac81be68fc9cbfa7933d0c4b10dc39f4a85dda84ae2a774d36bc",
		holeObjId: "0x987c912519b07c6348756a06cafdfaafb363dba15b79ab997beb36d72030607c",
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
		digPkgId: "",
		holeObjId: "",
	},
}[network];

// === contract constants ===

// === contract errors ===

export const errorsByPackage: ErrorsByPackage = {
	[networkIds.digPkgId]: {},
};
