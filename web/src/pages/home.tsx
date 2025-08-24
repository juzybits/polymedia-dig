// import { EarthVisualization } from "@/comp/Earth";

import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Btn, Card, ConnectOr } from "@polymedia/suitcase-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import * as dig_module from "@/gen/dig/dig";

export const PageHome = () => {
	const currAcct = useCurrentAccount();
	const { errParser, signAndExecuteTx, openConnectModal } = useAppContext();

	const digHole = useMutation({
		mutationFn: async () => {
			if (!currAcct) {
				throw new Error("Not connected");
			}
			const tx = new Transaction();
			tx.add(
				dig_module.dig({
					arguments: {
						hole: networkIds.holeObjId,
					},
				}),
			);
			return signAndExecuteTx({ tx, sender: currAcct.address });
		},
		onSuccess: (resp) => {
			toast.success("Success!");
			console.log(`[dig] status:`, resp.effects?.status.status);
			console.log(`[dig] digest:`, resp.digest);
			console.log(`[dig] response:`, resp);
		},
		onError: (error) => {
			console.warn(`[dig] error:`, error);
			toast.error(errParser.errToStr(error, "Something went wrong"));
		},
	});

	return (
		<div className="page-regular">
			<div className="page-title">I'm digging a hole</div>
			<Card>
				<ConnectOr openConnectModal={openConnectModal}>
					<Btn onClick={() => digHole.mutate()} disabled={digHole.isPending}>
						{digHole.isPending ? "DIGGING..." : "DIG HOLE"}
					</Btn>
				</ConnectOr>
			</Card>
			{/* <EarthVisualization /> */}
		</div>
	);
};
