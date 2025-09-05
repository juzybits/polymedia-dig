import type { ErrorsByPackage, NetworkName } from "@polymedia/suitcase-core";

export const network: NetworkName = "devnet" as const;

export const networkIds = {
	mainnet: {
		digPkgId: "0xfc1922ae0f9021550924b4b353bb595ec3e78a72a4fe6da351dd9af376dd1614",
		holeObjId: "0xedaa74161d02eed779518c9e11a31f0b29bcc29f5f510d6641ddaf64ec79d858",
		nftPkgId: "",
		registryId: "",
	},
	testnet: {
		digPkgId: "0xdd1e682de1cb85bad554e4db5bd172e8079478e0de7b0b6e8e244e63d06493d9",
		holeObjId: "0xf0dc3fe90af9168b5bf8f59245f210bb2a0a44879c5716e34d17cae56562f08e",
		nftPkgId: "",
		registryId: "",
	},
	devnet: {
		digPkgId: "0xb0fc5cb9acb730515b6efb9c1e12797a625f167090aaef9b7469b70fbd2bd07a",
		holeObjId: "0x66b77216ee276bd164287215847571f8354eaff41ebf41458078fc4e662171c6",
		nftPkgId: "0xb0fc5cb9acb730515b6efb9c1e12797a625f167090aaef9b7469b70fbd2bd07a",
		registryId: "0x2c75642bd414d7f301c7f37c0629e429ce73edc1cba063fac7c11e63a258c7ea",
	},
	localnet: {
		digPkgId: "",
		holeObjId: "",
		nftPkgId: "",
		registryId: "",
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
