import type { ErrorsByPackage, NetworkName } from "@polymedia/suitcase-core";

export const network: NetworkName = "mainnet" as const;

export const networkIds = {
	mainnet: {
		digPkgId: "0xfc1922ae0f9021550924b4b353bb595ec3e78a72a4fe6da351dd9af376dd1614",
		holeObjId: "0xedaa74161d02eed779518c9e11a31f0b29bcc29f5f510d6641ddaf64ec79d858",
	},
	testnet: {
		digPkgId: "",
		holeObjId: "",
	},
	devnet: {
		digPkgId: "0xb4fa3e6c94aa99ff2cf32e4556ff958ecf4875e2614ac8e8300720bec370ca8d",
		holeObjId: "0x912fac72f4b24569808c38bd4206a34d07bb4d760238b96ea961d2505ddb586b",
	},
	localnet: {
		digPkgId: "0xc6316bc103d69b085a1f953b3edf91cd413742d2b1c701519e0871e46ce071b2",
		holeObjId: "0x86cb83b09e39ceee48f9ee2304bfdaa71b5cf223ef0e583f40c8e8008a4cac92",
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
