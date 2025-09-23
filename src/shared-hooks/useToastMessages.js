import Errors from "@/shared-modules/Errors.mjs";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function useToastMessages() {
	const toastSuccess = useCallback((message, opts) => {
		toast.success(message, opts);
	}, []);

	const toastInfo = useCallback((message, opts) => {
		toast.info(message, opts);
	}, []);

	const toastWarn = useCallback((message, opts) => {
		toast.warn(message, {
			position: "top-right",
			...opts,
		});
	}, []);

	const toastError = useCallback((message, arg1, arg2) => {
		let err = arg1;
		let opts = arg2;

		if (arg2?.message) {
			opts = arg1
			err = arg2
		}

		if (err) {
			toastEx.error(message, err), {
				position: "top-right",
				...opts,
			});
} else {
	toast.error(message, {
		position: "top-right",
		...opts
	});
}
	}, []);

return {
	toastInfo,
	toastSuccess,
	toastWarn,
	toastError
}

}