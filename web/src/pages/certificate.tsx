import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { objResToBcs } from "@polymedia/suitcase-core";
import { Card, ConnectOr } from "@polymedia/suitcase-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import { Hole } from "@/gen/dig/dig";
import * as nft_module from "@/gen/hole_certificate/hole_certificate";
import { randomSuccessMessage } from "@/lib/messages";

const dryRun = false;

export const PageCertificate = () => {
	const suiClient = useSuiClient();
	const currAcct = useCurrentAccount();
	const { errParser, signAndExecuteTx, openConnectModal } = useAppContext();

	const hole = useQuery({
		queryKey: ["hole", networkIds.holeObjId],
		queryFn: async () => {
			return suiClient
				.getObject({
					id: networkIds.holeObjId,
					options: { showType: true, showBcs: true },
				})
				.then((objRes) => Hole.fromBase64(objResToBcs(objRes)));
		},
	});

	const mint = useMutation({
		mutationFn: async () => {
			if (!currAcct) {
				throw new Error("Not connected");
			}
			const tx = new Transaction();
			tx.add(
				nft_module.mint({
					arguments: {
						hole: networkIds.holeObjId,
						registry: networkIds.registryId,
					},
				}),
			);
			return signAndExecuteTx({ tx, sender: currAcct.address, dryRun });
		},
		onSuccess: (resp) => {
			toast.success(randomSuccessMessage());
			console.log("[mint] status:", resp.effects?.status.status);
			console.log("[mint] digest:", resp.digest);
			console.log("[mint] response:", resp);
		},
		onError: (error) => {
			console.warn(`[mint] error:`, error);
			toast.dismiss();
			toast.error(errParser.errToStr(error, "Something went wrong"));
		},
	});

	return (
		<div className="page-regular">
			<div className="page-title">HOLE CERTIFICATE</div>
			<Card>
				<div className="center-text">
					<ConnectOr openConnectModal={openConnectModal} btnMsg="CONNECT" wrap={false}>
						<div>TODO</div>
					</ConnectOr>
				</div>
			</Card>
		</div>
	);
};
