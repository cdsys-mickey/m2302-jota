import { AuthContext } from "@/contexts/auth/AuthContext";
import { toastEx } from "@/helpers/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useRef } from "react";

const DEFAULT_PROMPT = `請輸入密碼後繼續`;

const DEFAULT_LABEL = ({ action }) => {
	return `${action}密碼`;
}

const DEFAULT_ENTRY_ERROR_MESSAGE = ({ action }) => {
	return "密碼錯誤, 請重新輸入";
}

const DEFAULT_TITLE = ({ action }) => {
	return "此作業受到密碼保護";
}

const usePwordCheck = (opts = {}) => {
	const { action = "執行", label = DEFAULT_LABEL, entryErrorMessage = DEFAULT_ENTRY_ERROR_MESSAGE } = opts;
	const { token } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const pwordLockRef = useRef({
		passed: false
	});
	const {
		httpPostAsync
	} = useWebApi();

	// 讀取密碼
	// const loadStockPword = useCallback(async () => {
	// 	try {
	// 		const { status, payload, error } = await httpGetAsync({
	// 			url: `v1/ou/dept/params`,
	// 			bearer: token,
	// 			params: {
	// 				id: "StockPword",
	// 				dc: 1,
	// 			},
	// 		});
	// 		if (status.success) {
	// 			pwordLockRef.current = {
	// 				value: payload,
	// 				passed: false,
	// 			};
	// 		} else {
	// 			throw error ?? new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		toastEx.error("讀取設定發生錯誤", err), {
	// 			position: "top-right"
	// 		});
	// 	}
	// }, [httpGetAsync, token]);


	const promptPwordEntry = useCallback(
		(opts = {}) => {
			const { first = false, callback, message = DEFAULT_PROMPT, title = DEFAULT_TITLE, label = DEFAULT_LABEL } = opts;
			console.log("promptPwordEntry, first:", first);

			const _message = typeof message === "function" ? message({ action }) : message;
			const _title = typeof title === "function" ? title({ action }) : title;
			const _label = typeof label === "function" ? label({ action }) : label;

			dialogs.prompt({
				title: _title,
				message: _message,
				label: _label,
				// mask: true,
				triggerCancelOnClose: true,
				onConfirm: async ({ value }) => {
					try {
						const { status } = await httpPostAsync({
							url: `v2/ou/dept/params/validate`,
							bearer: token,
							data: {
								pword: value
							}
						})
						console.log("status", status);
						if (status.success) {
							console.log("pword passed");
							pwordLockRef.current = {
								...pwordLockRef.current,
								passed: true,
							};
							if (callback) {
								callback();
							}
						} else {
							console.log("pword not passed");
							const _entryErrorMessage = typeof entryErrorMessage === "function" ? entryErrorMessage({ action }) : entryErrorMessage;
							toastEx.error(_entryErrorMessage);
							promptPwordEntry(opts);
						}

					} catch (err) {
						console.error(err);
						toastEx.error("驗證時發生錯誤");
					}
				},
				onCancel: () => {
					console.log("pword cancelled");

				},
				// confirmText: "通過",
			});
		},
		[action, dialogs, entryErrorMessage, httpPostAsync, token]
	);

	const performCheck = useCallback(({ callback, ...rest }) => {
		if (!pwordLockRef.current?.passed) {
			promptPwordEntry({ first: true, callback, ...rest });
			return;
		}
		if (callback) {
			callback();
		} else {
			console.error("未指定 callback")
		}
	}, [promptPwordEntry]);

	// useInit(() => {
	// 	loadStockPword();
	// }, []);

	return {
		performCheck
	}

}

export default usePwordCheck