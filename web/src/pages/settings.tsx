import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import {
	Btn,
	Card,
	ConnectToGetStarted,
	ExplorerRadioSelector,
	LinkExternal,
	LinkToExplorer,
	RpcRadioSelector,
} from "@polymedia/suitcase-react";
import { network } from "@/app/config";
import { useAppContext } from "@/app/context";

export const PageSettings = () => {
	return (
		<div className="page-regular">
			<div className="page-title">SETTINGS</div>
			<SectionConnection />
			<SectionRpc />
			<SectionExplorer />
		</div>
	);
};

const SectionConnection = () => {
	// === state ===

	const currAcct = useCurrentAccount();
	const { mutate: disconnect } = useDisconnectWallet();
	const { explorer, openConnectModal } = useAppContext();

	// === html ===

	return (
		<Card>
			<div className="card-title">Wallet</div>
			{!currAcct ? (
				<ConnectToGetStarted openConnectModal={openConnectModal} />
			) : (
				<>
					<div>
						Connected:{" "}
						<LinkToExplorer
							addr={currAcct.address}
							kind="address"
							explorer={explorer}
							network={network}
						/>
					</div>
					<Btn onClick={() => Promise.resolve(disconnect())}>DISCONNECT</Btn>
				</>
			)}
		</Card>
	);
};

const SectionExplorer = () => {
	const { explorer, setExplorer } = useAppContext();

	return (
		<Card>
			<div className="card-title">Explorer</div>
			<ExplorerRadioSelector selectedExplorer={explorer} onSwitch={setExplorer} />
		</Card>
	);
};

const SectionRpc = () => {
	// === state ===

	const { rpc, setRpc } = useAppContext();

	// === html ===

	return (
		<Card>
			<div className="card-title">RPC</div>
			<RpcRadioSelector network={network} selectedRpc={rpc} onSwitch={setRpc} />
			{network === "mainnet" && (
				<div>
					Not sure?{" "}
					<LinkExternal href="https://rpcs.polymedia.app">
						Find the fastest RPC for you
					</LinkExternal>
					.
				</div>
			)}
		</Card>
	);
};
