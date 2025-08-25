import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { objResToBcs } from "@polymedia/suitcase-core";
import { Btn, Card, CardDetail, ConnectOr } from "@polymedia/suitcase-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import { Earth } from "@/comp/earth";
import * as dig_module from "@/gen/dig/dig";
import { Hole } from "@/gen/dig/dig";

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

	const progress = !hole.data
		? null
		: Number(hole.data.progress) / Number(hole.data.distance);

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
			<Card className="earth-card">
				<Earth progress={progress} />
			</Card>
			<HoleDetails hole={hole.data} />
			<FaqCard />
		</div>
	);
};

// TODO move details into earth card
const HoleDetails = ({ hole }: { hole: typeof Hole.$inferType | undefined }) => {
	if (!hole) return null;

	const distanceKm = Number(hole.distance) / 1000;
	const progressPct = (Number(hole.progress) / Number(hole.distance)) * 100;

	return (
		<Card>
			<div className="card-title">Hole Facts</div>
			<div className="card-details">
				<CardDetail label="Distance" val={`${distanceKm.toFixed(0)}km`} />
				<CardDetail label="Progress" val={`${progressPct.toFixed(2)}%`} />
				<CardDetail label="Diggers" val={hole.users.size} />
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
					<p className="faq-answer">More digging.</p>
				</div>
				<div className="faq">
					<p className="faq-question">Why is it called J-HOLE?</p>
					<p className="faq-answer">Because it's a hole that goes to Japan.</p>
				</div>
				<div className="faq">
					<p className="faq-question">So you wouldn't mind if I was to dig too?</p>
					<p className="faq-answer">Go for it.</p>
				</div>
				<div className="faq">
					<p className="faq-question">Maybe I will.</p>
					<p className="faq-answer">What's stopping you?</p>
				</div>
			</div>
		</Card>
	);
};
