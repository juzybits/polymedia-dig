import type { SuiCodegenConfig } from "@mysten/codegen";

const config: SuiCodegenConfig = {
	output: "./src/gen",
	packages: [
		{
			package: "@local-pkg/dig",
			path: "../move",
		},
	],
};

export default config;
