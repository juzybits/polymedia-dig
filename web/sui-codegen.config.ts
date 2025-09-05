import type { SuiCodegenConfig } from "@mysten/codegen";

const config: SuiCodegenConfig = {
	output: "./src/gen",
	packages: [
		{
			package: "@local-pkg/dig",
			path: "../move",
		},
		{
			package: "@local-pkg/hole_certificate",
			path: "../nft",
		},
	],
};

export default config;
