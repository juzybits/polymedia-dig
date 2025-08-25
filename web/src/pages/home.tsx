import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { devInspectAndGetReturnValues, objResToBcs } from "@polymedia/suitcase-core";
import {
	Btn,
	Card,
	CardSpinner,
	ConnectOr,
	isLocalhost,
} from "@polymedia/suitcase-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import { Earth3D } from "@/comp/earth3d";
import * as dig_module from "@/gen/dig/dig";
import { Hole } from "@/gen/dig/dig";
import { randomSuccessMessage } from "@/lib/messages";

const dryRun = false;
const refetchInterval = isLocalhost() ? 5_000 : 10_000;

export const PageHome = () => {
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
		refetchInterval,
	});

	const userDigs = useQuery({
		queryKey: ["userDigs", currAcct?.address],
		queryFn: async () => {
			if (!currAcct) {
				throw new Error("Not connected");
			}
			const tx = new Transaction();
			tx.add(
				dig_module.userDigs({
					arguments: {
						hole: networkIds.holeObjId,
						user: currAcct.address,
					},
				}),
			);
			const blockReturns = await devInspectAndGetReturnValues(suiClient, tx, [[bcs.U64]]);
			return Number(blockReturns[0]![0]!);
		},
		enabled: !!currAcct,
		refetchInterval,
	});

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
			return signAndExecuteTx({ tx, sender: currAcct.address, dryRun });
		},
		onSuccess: (resp) => {
			toast.dismiss();
			toast.success(randomSuccessMessage());
			console.log(`[dig] status:`, resp.effects?.status.status);
			console.log(`[dig] digest:`, resp.digest);
			console.log(`[dig] response:`, resp);
		},
		onError: (error) => {
			console.warn(`[dig] error:`, error);
			toast.dismiss();
			toast.error(errParser.errToStr(error, "Something went wrong"));
		},
	});

	return (
		<div className="page-regular">
			<div className="page-title">We Are Digging A Hole</div>
			<Card>
				<div className="center-text">
					<ConnectOr openConnectModal={openConnectModal} wrap={false}>
						<Btn onClick={() => dig.mutate()} disabled={dig.isPending} wrap={false}>
							{dig.isPending ? "DIGGING..." : "DIG HOLE"}
						</Btn>
						{userDigs.data && userDigs.data > 0 && (
							<div className="user-digs">
								You dug {userDigs.data} time{userDigs.data === 1 ? "" : "s"}
							</div>
						)}
					</ConnectOr>
				</div>
			</Card>
			<EarthCard hole={hole.data} />
			<FaqCard />
		</div>
	);
};

const EarthCard = ({ hole }: { hole: typeof Hole.$inferType | undefined }) => {
	if (!hole) return <CardSpinner />;
	const progress = Number(hole.progress) / Number(hole.distance);
	const remaining = Number(hole.distance) - Number(hole.progress);
	return (
		<Card className="earth-card">
			<Earth3D progress={progress} />
			<div className="earth-stats">
				<div>
					{remaining > 0 ? `${remaining.toLocaleString()}m to Japan` : "hole is complete"}
				</div>
				<div>
					{hole.users.size} digger{hole?.users.size === "1" ? "" : "s"}
				</div>
			</div>
		</Card>
	);
};

const FaqCard = () => {
	return (
		<Card>
			<div className="faqs">
				<div className="card-title">F.A.Q.</div>
				<div className="faq">
					<p className="faq-question">What are you doing?</p>
					<p className="faq-answer">Digging.</p>
				</div>
				<div className="faq">
					<p className="faq-question">Why?</p>
					<p className="faq-answer">To make a hole.</p>
				</div>
				<div className="faq">
					<p className="faq-question">A hole for what?</p>
					<p className="faq-answer">To get to Japan.</p>
				</div>
				<div className="faq">
					<p className="faq-question">What happens when you get there?</p>
					<p className="faq-answer">We stop digging.</p>
				</div>
				<div className="faq">
					<p className="faq-question">And then?</p>
					<p className="faq-answer">Then there is a hole.</p>
				</div>
				<div className="faq">
					<p className="faq-question">What's the utility?</p>
					<p className="faq-answer">It's a hole.</p>
				</div>
				<div className="faq">
					<p className="faq-question">Can I dig too?</p>
					<p className="faq-answer">Go for it.</p>
				</div>
			</div>
		</Card>
	);
};
