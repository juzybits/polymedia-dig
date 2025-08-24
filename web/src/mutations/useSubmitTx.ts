import { useCurrentAccount } from "@mysten/dapp-kit";
import type { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppContext } from "@/app/context";

export function useSubmitTx<T>(a: {
	name: string;
	mutationFn: (currAddr: string, val: T) => Promise<SuiTransactionBlockResponse>;
	onSuccess?: (resp: SuiTransactionBlockResponse) => void;
	onError?: (error: Error) => void;
}) {
	const currAcct = useCurrentAccount();
	const { errParser } = useAppContext();

	return useMutation({
		mutationFn: async (val: T) => {
			if (!currAcct) {
				throw new Error("Not connected");
			}
			return a.mutationFn(currAcct.address, val);
		},
		onSuccess: (resp) => {
			toast.success("Success!");
			console.log(`[${a.name}] status:`, resp.effects?.status.status);
			console.log(`[${a.name}] digest:`, resp.digest);
			console.log(`[${a.name}] response:`, resp);
			a.onSuccess?.(resp);
		},
		onError: (error) => {
			console.warn(`[${a.name}] error:`, error);
			toast.error(errParser.errToStr(error, "Something went wrong"));
			a.onError?.(error);
		},
	});
}
