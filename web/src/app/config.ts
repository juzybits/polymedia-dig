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
		digPkgId: "0xc6316bc103d69b085a1f953b3edf91cd413742d2b1c701519e0871e46ce071b2",
		holeObjId: "0x9a2d023aaf9ef15e53a811c8c7f59030af32893938006b8dbcc22b84898daab5",
	},
}[network];

// === contract constants ===

// === contract errors ===

export const errorsByPackage: ErrorsByPackage = {
	[networkIds.digPkgId]: {
		1000: { symbol: "EInvalidDistance" },
		1001: { symbol: "EAlreadyComplete", msg: "The hole is complete!" },
	},
};
