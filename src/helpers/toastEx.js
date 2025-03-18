import Errors from "@/shared-modules/Errors";
import { toast } from "react-toastify";

export const toastEx = {
	success: (message, opts) => {
		toast.success(message, opts);
	},
	info: (message, opts) => {
		toast.info(message, opts);
	},
	warn: (message, opts) => {
		toast.warn(message, {
			position: "top-right",
			...opts,
		});
	},
	error: (message, arg1, arg2) => {
		let err = arg1;
		let opts = arg2;

		if (arg2?.message) {
			opts = arg1;
			err = arg2;
		}

		if (err) {
			toast.error(Errors.getMessage(message, err), {
				position: "top-right",
				...opts,
			});
		} else {
			toast.error(message, {
				position: "top-right",
				...opts,
			});
		}
	},
};
