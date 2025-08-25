// import { EarthVisualization } from "@/comp/Earth";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { objResToBcs } from "@polymedia/suitcase-core";
import {
	Btn,
	Card,
	CardDetail,
	ConnectOr,
	LinkToExplorer,
} from "@polymedia/suitcase-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { network, networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import * as dig_module from "@/gen/dig/dig";
import { Hole } from "@/gen/dig/dig";

export const PageHome = () => {
	const currAcct = useCurrentAccount();
	const { errParser, signAndExecuteTx, openConnectModal } = useAppContext();

	const dig = useMutation({
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
			return signAndExecuteTx({ tx, sender: currAcct.address, dryRun: false });
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
					<Btn onClick={() => dig.mutate()} disabled={dig.isPending}>
						{dig.isPending ? "DIGGING..." : "DIG HOLE"}
					</Btn>
				</ConnectOr>
			</Card>
			<HoleDetails />
			{/* <EarthVisualization /> */}
		</div>
	);
};

const HoleDetails = () => {
	const suiClient = useSuiClient();
	const { explorer } = useAppContext();

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

	if (!hole.data) return null;

	const data = hole.data!;

	const distanceKm = Number(data.distance) / 1000;
	const progressPct = (Number(data.progress) / Number(data.distance)) * 100;

	return (
		<Card>
			<div className="card-title">Hole Facts</div>
			<div className="card-details">
				<CardDetail
					label="ID"
					val={
						<LinkToExplorer
							addr={data.id.id}
							kind="object"
							explorer={explorer}
							network={network}
						/>
					}
				/>
				<CardDetail label="Distance" val={`${distanceKm.toFixed(0)}km`} />
				<CardDetail label="Progress" val={`${progressPct.toFixed(2)}%`} />
				<CardDetail label="Diggers" val={data.users.size} />
			</div>
		</Card>
	);
};
