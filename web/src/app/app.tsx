import {
	ConnectModal,
	SuiClientProvider,
	useCurrentAccount,
	useSignTransaction,
	useSuiClient,
	WalletProvider,
} from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { CoinMetaFetcher } from "@polymedia/suitcase-core";
import {
	type ExplorerName,
	Glitch,
	IconGears,
	IconHistory,
	IconNew,
	loadExplorer,
	loadRpc,
	type Setter,
} from "@polymedia/suitcase-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { network } from "@/app/config";
import { AppContext } from "@/app/context";
import { TxErrorParser } from "@/lib/errors";
import { newSignAndExecuteTx, type SignAndExecuteTx } from "@/lib/txs";
import { PageHome } from "@/pages/home";
import { PageNotFound } from "@/pages/not-found";
import { PageSettings } from "@/pages/settings";

// ==== router ====

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppSuiProviders />}>
				<Route index element={<PageHome />} />
				<Route path="/settings" element={<PageSettings />} />
				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

// ==== sui providers ====

const queryClient = new QueryClient();

const AppSuiProviders = () => {
	const [rpc, setRpc] = useState(loadRpc({ network }));
	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={{ [network]: { url: rpc } }} network={network}>
				<WalletProvider autoConnect={true}>
					<App rpc={rpc} setRpc={setRpc} />
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
};

// ==== app ====

export type AppContextType = {
	rpc: string;
	setRpc: Setter<string>;
	explorer: ExplorerName;
	setExplorer: Setter<ExplorerName>;
	openConnectModal: () => void;
	signAndExecuteTx: SignAndExecuteTx;
	coinMetaFetcher: CoinMetaFetcher;
	errParser: TxErrorParser;
};

const App = (args: { rpc: string; setRpc: Setter<string> }) => {
	// === state ===

	const [explorer, setExplorer] = useState(loadExplorer("Polymedia"));

	const [showConnectModal, setShowConnectModal] = useState(false);
	const openConnectModal = () => {
		setShowConnectModal(true);
	};

	const suiClient = useSuiClient();
	const currAcct = useCurrentAccount();
	const { mutateAsync: walletSignTx } = useSignTransaction();

	const signAndExecuteTx = useMemo(
		() =>
			newSignAndExecuteTx({
				suiClient,
				signTx: (tx) => walletSignTx({ transaction: tx }),
				sender: currAcct?.address,
			}),
		[suiClient, walletSignTx, currAcct?.address],
	);

	const coinMetaFetcher = useMemo(() => new CoinMetaFetcher({ suiClient }), [suiClient]);

	const errParser = useMemo(() => new TxErrorParser(errorsByPackage), []);

	const appContext: AppContextType = {
		rpc: args.rpc,
		setRpc: args.setRpc,
		explorer,
		setExplorer,
		openConnectModal,
		signAndExecuteTx,
		coinMetaFetcher,
		errParser,
	};

	// === html ===

	return (
		<AppContext.Provider value={appContext}>
			<Header />
			<Outlet /> {/* loads a page/*.tsx */}
			<ConnectModal
				trigger={<button type="button" style={{ display: "none" }} />}
				open={showConnectModal}
				onOpenChange={(isOpen) => {
					setShowConnectModal(isOpen);
				}}
			/>
			<Toaster position="bottom-right" containerStyle={{ marginTop: 23 }} />
		</AppContext.Provider>
	);
};

/* One-off components */

const Header = () => {
	return (
		<header>
			<div className="header-item">
				<Link to="/">
					<Glitch text="DIG" />
					{network !== "mainnet" && (
						<span className="header-network-label">{network}</span>
					)}
				</Link>
			</div>
			<Link to="/new" className="header-item" title="Create Auction">
				<IconNew />
			</Link>
			<Link to="/user" className="header-item" title="Your History">
				<IconHistory />
			</Link>
			<Link to="/settings" className="header-item" title="Settings">
				<IconGears />
			</Link>
		</header>
	);
};
