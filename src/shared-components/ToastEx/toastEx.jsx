import { ToastEx } from "@/shared-components";
import Errors from "@/shared-modules/Errors.mjs";
import { toast } from "react-toastify";

const DEFAULT_OPTS = {
	// progress: 1,
	autoClose: 10000,
	// hideProgressBar: true
};

const DEFAULT_VIEW_SLOT_OPTS = {
	button: {
		dense: true,
		// color: "white"
	}
};

const toastEx = (message, opts = {}) => {
	const { type = "info", error, ...restOpts } = opts;

	switch (type) {
		case "success":
			return toastEx.success(message, restOpts);
		case "info":
			return toastEx.info(message, restOpts);
		case "warning":
			return toastEx.warn(message, restOpts);
		case "error":
			return toastEx.error(message, error, restOpts);
		default:
			return toastEx.info(message, restOpts);
	}
};

const getToastOptions = (type, onAction, opts = {}) => {
	return {
		...DEFAULT_OPTS,
		...(!onAction && {
			hideProgressBar: true
		}),
		type,
		style: {
			// ...((!onAction || opts.hideProgressBar) && {
			...((!onAction) && {
				borderLeft: `6px solid var(--toastify-color-${type})`, // 動態使用 CSS 變數
			})
			// 可根據需要添加其他樣式
			// 例如：color: `var(--toastify-text-color-${type})`,
		},
		...opts,
	}
};

const createToastContent = (message, opts = {}) => {
	return opts?.onAction ? (
		() => (
			<ToastEx
				message={message || "(空白)"}
				actionText={opts?.actionText}
				onAction={opts?.onAction}
				slotProps={{
					...DEFAULT_VIEW_SLOT_OPTS,
					...opts?.slotProps
				}}
			/>
		)
	) : (
		message
	);
};

toastEx.success = (message, opts = {}) => {
	const { actionText, onAction, slotProps, ...restOpts } = opts;
	const ToastContent = createToastContent(message, { actionText, onAction, slotProps });
	toast(ToastContent, getToastOptions("success", onAction, restOpts));
};

toastEx.info = (message, opts = {}) => {
	const { actionText, onAction, slotProps, ...restOpts } = opts;
	const ToastContent = createToastContent(message, { actionText, onAction, slotProps });
	toast(ToastContent, getToastOptions("info", onAction, restOpts));
};

toastEx.warn = (message, opts = {}) => {
	const { actionText, onAction, slotProps, ...restOpts } = opts;
	const ToastContent = createToastContent(message, { actionText, onAction, slotProps });
	toast(ToastContent, {
		...getToastOptions("warning", onAction, restOpts),
		position: "top-right",
	});
};

toastEx.error = (message, arg1 = {}, arg2 = {}) => {
	let err = arg1;
	let opts = arg2;

	if (arg2?.message) {
		opts = arg1;
		err = arg2;
	}

	const _msg = err ? Errors.getMessage(message, err) : message;

	const { actionText, onAction, slotProps, ...restOpts } = opts;
	const ToastContent = createToastContent(_msg, { actionText, onAction, slotProps });

	const options = {
		...getToastOptions("error", onAction, restOpts),
		position: "top-right",
	};

	toast(ToastContent, options);
	if (err) {
		console.error(_msg, err);
	} else {
		console.warn(_msg);
	}
};

export default toastEx;
