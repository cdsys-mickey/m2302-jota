import { AuthContext } from "@/contexts/auth/AuthContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useContext } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const DEFAULT_GET_PROMPT = ({ action }) => {
	return `請輸入密碼後繼續`;
}

const DEFAULT_GET_LABEL = ({ action }) => {
	return `${action}密碼`;
}

const DEFAULT_ENTRY_ERROR_TEXT = ({ action }) => {
	return "密碼錯誤, 請重新輸入";
}

const DEFAULT_GET_TITLE = ({ action }) => {
	return "此作業受到密碼保護";
}

const usePwordCheck = (opts = {}) => {
	const { action = "執行", getPromptMessage = DEFAULT_GET_PROMPT, getLabel = DEFAULT_GET_LABEL, getEntryErrorText = DEFAULT_ENTRY_ERROR_TEXT, getTitle = DEFAULT_GET_TITLE, } = opts;
	const { token } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const pwordLockRef = useRef(null);
	const {
		httpGetAsync,
	} = useWebApi();

	// 讀取密碼
	const loadStockPword = useCallback(async () => {
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/ou/dept/params`,
				bearer: token,
				params: {
					id: "StockPword",
					dc: 1,
				},
			});
			if (status.success) {
				pwordLockRef.current = {
					value: payload,
					passed: false,
				};
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("讀取設定發生錯誤", err), {
				position: "top-center"
			});
		}
	}, [httpGetAsync, token]);

	const promptPwordEntry = useCallback(
		(opts = {}) => {
			const { first = false, callback } = opts;
			console.log("promptPwordEntry, first:", first);

			dialogs.prompt({
				title: getTitle({ action }),
				message: getPromptMessage({ action }),
				label: getLabel({ action }),
				triggerCancelOnClose: true,
				onConfirm: ({ value }) => {
					if (value === pwordLockRef.current.value) {
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
						toast.error(getEntryErrorText({ action }), {
							position: "top-center"
						});
						promptPwordEntry();
					}
				},
				onCancel: () => {
					console.log("pword cancelled");

				},
				// confirmText: "通過",
			});
		},
		[action, dialogs, getEntryErrorText, getLabel, getPromptMessage, getTitle]
	);

	const performCheck = useCallback(({ callback }) => {
		if (!pwordLockRef.current.passed) {
			promptPwordEntry({ first: true, callback });
			return;
		}
		if (callback) {
			callback();
		} else {
			console.error("未指定 callback")
		}
	}, [promptPwordEntry]);

	useInit(() => {
		loadStockPword();
	}, []);

	return {
		performCheck
	}

}

export default usePwordCheck