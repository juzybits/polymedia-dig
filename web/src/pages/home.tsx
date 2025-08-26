import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { devInspectAndGetReturnValues, objResToBcs } from "@polymedia/suitcase-core";
import {
	Btn,
	Card,
	CardSpinner,
	ConnectOr,
	useInputUnsignedInt,
} from "@polymedia/suitcase-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { networkIds } from "@/app/config";
import { useAppContext } from "@/app/context";
import { Earth3D } from "@/comp/earth3d";
import * as dig_module from "@/gen/dig/dig";
import { Hole } from "@/gen/dig/dig";
import { randomFinalMessage, randomSuccessMessage } from "@/lib/messages";

const dryRun = false;
const refetchInterval = 10_000;
const progressCacheTTL = 60_000;
const finalMessage = randomFinalMessage();

export const PageHome = () => {
	const suiClient = useSuiClient();
	const currAcct = useCurrentAccount();
	const { errParser, signAndExecuteTx, openConnectModal } = useAppContext();

	const [localUserDigs, setLocalUserDigs] = useState(0);
	const [autoDigEnabled, setAutoDigEnabled] = useState(false);
	const [ongoing, setOngoing] = useState(false);

	const inputGasPrice = useInputUnsignedInt({
		label: "Gas price",
		html: {
			value: "501",
		},
	});

	const hole = useQuery({
		queryKey: ["hole", networkIds.holeObjId],
		queryFn: async () => {
			return suiClient
				.getObject({
					id: networkIds.holeObjId,
					options: { showType: true, showBcs: true },
				})
				.then((objRes) => {
					const hole = Hole.fromBase64(objResToBcs(objRes));
					if (hole.progress === hole.distance) {
						setOngoing(false);
					}
					return hole;
				});
		},
		refetchInterval: ongoing ? refetchInterval : 0,
	});

	const dig = useMutation({
		mutationFn: async () => {
			if (!currAcct) {
				throw new Error("Not connected");
			}
			const tx = new Transaction();
			tx.setGasPrice(inputGasPrice.val ?? 501);
			// tx.add(
			// 	dig_module.dig({
			// 		arguments: {
			// 			hole: networkIds.holeObjId,
			// 		},
			// 	}),
			// );
			tx.moveCall({
				target: `${networkIds.digPkgId}::dig::dig`,
				arguments: [tx.object(networkIds.holeObjId), tx.object("0x8")],
			});
			return signAndExecuteTx({ tx, sender: currAcct.address, dryRun });
		},
		onSuccess: (resp) => {
			setLocalUserDigs((prev) => prev + 1);
			toast.dismiss();
			toast.success(randomSuccessMessage());
			console.log(`[dig] status:`, resp.effects?.status.status);
			console.log(`[dig] digest:`, resp.digest);
			console.log(`[dig] response:`, resp);

			// continue auto-dig if enabled
			if (autoDigEnabled) {
				dig.mutate();
			}
		},
		onError: (error) => {
			console.warn(`[dig] error:`, error);
			toast.dismiss();
			toast.error(errParser.errToStr(error, "Something went wrong"));
			// auto-dig will stop automatically on error since onSuccess won't be called
		},
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
		refetchInterval: ongoing ? refetchInterval : 0,
	});

	useEffect(() => {
		if (userDigs.data !== undefined) {
			setLocalUserDigs(userDigs.data);
		}
	}, [userDigs.data]);

	return (
		<div className="page-regular">
			<div className="page-title">
				{ongoing ? "we're digging a hole" : "we dug a hole"}
			</div>
			<Card>
				<div className="center-text">
					<ConnectOr
						openConnectModal={openConnectModal}
						btnMsg={ongoing ? "START" : "CONNECT"}
						wrap={false}
					>
						{ongoing ? (
							<>
								<Btn onClick={() => dig.mutate()} disabled={dig.isPending} wrap={false}>
									{dig.isPending ? "DIGGING..." : "DIG HOLE"}
								</Btn>
								<div className="auto-dig-controls">
									<label className="auto-dig-checkbox">
										<input
											type="checkbox"
											checked={autoDigEnabled}
											onChange={(e) => setAutoDigEnabled(e.target.checked)}
											disabled={!currAcct}
										/>
										Auto-dig
									</label>
								</div>
								<div className="gas-price-input">{inputGasPrice.input}</div>
							</>
						) : (
							<div>{finalMessage}</div>
						)}
						{localUserDigs > 0 && (
							<div className="user-digs">
								You dug {localUserDigs} time{localUserDigs === 1 ? "" : "s"}
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
	const cachedProgressRef = useRef<{ value: number; timestamp: number } | null>(null);

	if (!hole) return <CardSpinner />;

	const progress = Number(hole.progress);
	const distance = Number(hole.distance);
	const progressPct = progress / distance;
	const remaining = distance - progress;
	const diggers = Number(hole.users.size);

	const now = Date.now();
	if (
		!cachedProgressRef.current ||
		now - cachedProgressRef.current.timestamp >= progressCacheTTL
	) {
		// use and cache the new value
		cachedProgressRef.current = {
			value: progressPct,
			timestamp: now,
		};
	}

	return (
		<Card className="earth-card">
			<Earth3D progress={cachedProgressRef.current.value} />
			<div className="earth-stats">
				{remaining > 0 && <div>{remaining.toLocaleString()}m to Japan</div>}
				<div>
					{progress.toLocaleString()}m dug{remaining > 0 ? " so far" : ""}
				</div>
				<div>
					{diggers.toLocaleString()} digger{diggers === 1 ? "" : "s"}
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
